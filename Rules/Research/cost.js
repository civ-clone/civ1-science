"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.costByAdvancesKnown = exports.rate = exports.catchUpApplies = exports.rateMultiplier = exports.catchUp = exports.isAD = exports.advancesKnown = void 0;
const ClientRegistry_1 = require("@civ-clone/core-client/ClientRegistry");
const GameDifficultyRegistry_1 = require("@civ-clone/core-difficulty/GameDifficultyRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const RuleIds_1 = require("../../RuleIds");
const Year_1 = require("@civ-clone/core-game-year/Year");
const CatchUp_1 = require("./CatchUp");
const Cost_1 = require("@civ-clone/core-science/Rules/Cost");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const RateMultiplier_1 = require("./RateMultiplier");
const isHuman_1 = require("@civ-clone/civ1-difficulty/isHuman");
const level_1 = require("@civ-clone/civ1-difficulty/level");
// Advances count from 1, without the free Mining, Irrigation and Roads, as v474.05 counts them.
const advancesKnown = (playerResearch) => playerResearch.complete().length + 1;
exports.advancesKnown = advancesKnown;
const isAD = (year) => {
    try {
        return year.value() >= 0;
    }
    catch (e) {
        // A game with no `YearRule` has no year: count it as BC.
        return false;
    }
};
exports.isAD = isAD;
/**
 * How much the rate rises by when the leader is ahead of schedule, up to 6: the most advances anyone has, less one for
 * every 9 turns played (`GameEngine.cs` L250-L256), whether or not it applies to `playerResearch` now.
 */
const catchUp = ({ playerResearchRegistry, turn }, playerResearch) => Math.min(Math.max(Math.max((0, exports.advancesKnown)(playerResearch), ...playerResearchRegistry
    .entries()
    .map((research) => (0, exports.advancesKnown)(research))) - Math.floor(turn.value() / 9), 0), 6);
exports.catchUp = catchUp;
/** What `playerResearch`'s rate is multiplied by now: by the game's `RateMultiplier` rules, or doubled from AD. */
const rateMultiplier = ({ ruleRegistry, year }, playerResearch) => {
    if (ruleRegistry === undefined) {
        return (0, exports.isAD)(year) ? 2 : 1;
    }
    const [multiplier] = ruleRegistry.process(RateMultiplier_1.default, playerResearch);
    // With none in force (a set that takes the place of v474.05's switched only partly on), v474.05's.
    return multiplier !== null && multiplier !== void 0 ? multiplier : ((0, exports.isAD)(year) ? 2 : 1);
};
exports.rateMultiplier = rateMultiplier;
/** Whether catch-up applies to `playerResearch` now: by the game's `CatchUp` rules, or from AD. */
const catchUpApplies = ({ ruleRegistry, year }, playerResearch) => {
    if (ruleRegistry === undefined) {
        return (0, exports.isAD)(year);
    }
    const [applies] = ruleRegistry.process(CatchUp_1.default, playerResearch);
    // With none in force, v474.05's.
    return applies !== null && applies !== void 0 ? applies : (0, exports.isAD)(year);
};
exports.catchUpApplies = catchUpApplies;
/**
 * What each step of an advance costs `playerResearch` now, in bulbs: R, with catch-up, doubled from AD (see below):
 * catch-up and the multiplier as the game's `CatchUp` and `RateMultiplier` rules say, when `context` has its rules.
 * `floor`: whether the human's R is held at 11 - advances for the first few, as v474.05's is. A cost that isn't a
 * number of advances times the rate (civ1-enhanced's tiers, civ-clone/web-renderer#1072) leaves it out.
 */
const rate = (context, playerResearch, floor = true) => {
    const level = (0, level_1.levelOf)(context.gameDifficultyRegistry), human = (0, isHuman_1.default)(playerResearch.player(), context.clientRegistry), advances = (0, exports.advancesKnown)(playerResearch), ratio = (human ? 6 + 2 * level : 14 - level) +
        ((0, exports.catchUpApplies)(context, playerResearch)
            ? (0, exports.catchUp)(context, playerResearch)
            : 0);
    return ((human && floor ? Math.max(ratio, 11 - advances) : ratio) *
        (0, exports.rateMultiplier)(context, playerResearch));
};
exports.rate = rate;
/**
 * What an advance costs `playerResearch` by v474.05's rule: the advances it knows, plus one, times the rate, to the
 * nearest whole bulb (a multiplier that isn't whole, civ-clone/web-renderer#1077, can make it a fraction).
 */
const costByAdvancesKnown = (context, playerResearch) => Math.round((0, exports.advancesKnown)(playerResearch) * (0, exports.rate)(context, playerResearch));
exports.costByAdvancesKnown = costByAdvancesKnown;
// v474.05 (OpenCivOne `CityWorker.cs` L3662-L3690). An advance costs `advances × R` bulbs, where R is 6 + 2 × level
//  for the human (never below 11 - advances, so the first few cost at least 11 a step) and 14 - level for the
//  computer players. From AD it costs twice as much, and everyone's R rises by up to 6 more when the leader is ahead of
//  schedule: the most advances anyone has, less one for every 9 turns played (`GameEngine.cs` L250-L256).
//
// see also: https://forums.civfanatics.com/threads/how-many-bulbs-need-for-the-current-tech.376195/#post-13810088
const getRules = (gameDifficultyRegistry = GameDifficultyRegistry_1.instance, clientRegistry = ClientRegistry_1.instance, playerResearchRegistry = PlayerResearchRegistry_1.instance, turn = Turn_1.instance, year = Year_1.instance, 
// The rules the cost asks for its multiplier and catch-up. Left out, the cost is v474.05's whatever rules there
//  are, as before they were rules of their own.
ruleRegistry) => [
    new Cost_1.default(RuleIds_1.COST_RULE, new Effect_1.default((CostAdvance, playerResearch) => (0, exports.costByAdvancesKnown)({
        gameDifficultyRegistry,
        clientRegistry,
        playerResearchRegistry,
        turn,
        year,
        ruleRegistry,
    }, playerResearch))),
    // Each a rule of its own, so a set can take the place of either (civ-clone/web-renderer#1077).
    new RateMultiplier_1.default(RuleIds_1.RATE_MULTIPLIER_RULE, new Effect_1.default(() => ((0, exports.isAD)(year) ? 2 : 1))),
    new CatchUp_1.default(RuleIds_1.CATCH_UP_RULE, new Effect_1.default(() => (0, exports.isAD)(year))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=cost.js.map