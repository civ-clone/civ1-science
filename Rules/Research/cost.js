"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.costByAdvancesKnown = exports.rate = exports.advancesKnown = void 0;
const ClientRegistry_1 = require("@civ-clone/core-client/ClientRegistry");
const GameDifficultyRegistry_1 = require("@civ-clone/core-difficulty/GameDifficultyRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const Year_1 = require("@civ-clone/core-game-year/Year");
const RuleIds_1 = require("../../RuleIds");
const Cost_1 = require("@civ-clone/core-science/Rules/Cost");
const Effect_1 = require("@civ-clone/core-rule/Effect");
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
/**
 * What each step of an advance costs `playerResearch` now, in bulbs: R, with catch-up, doubled from AD (see below).
 * `floor`: whether the human's R is held at 11 - advances for the first few, as v474.05's is. A cost that isn't a
 * number of advances times the rate (civ1-enhanced's tiers, civ-clone/web-renderer#1072) leaves it out.
 */
const rate = ({ gameDifficultyRegistry, clientRegistry, playerResearchRegistry, turn, year, }, playerResearch, floor = true) => {
    const level = (0, level_1.levelOf)(gameDifficultyRegistry), human = (0, isHuman_1.default)(playerResearch.player(), clientRegistry), advances = (0, exports.advancesKnown)(playerResearch), ad = isAD(year), catchUp = ad
        ? Math.min(Math.max(Math.max(advances, ...playerResearchRegistry
            .entries()
            .map((research) => (0, exports.advancesKnown)(research))) - Math.floor(turn.value() / 9), 0), 6)
        : 0, ratio = (human ? 6 + 2 * level : 14 - level) + catchUp;
    return ((human && floor ? Math.max(ratio, 11 - advances) : ratio) * (ad ? 2 : 1));
};
exports.rate = rate;
/** What an advance costs `playerResearch` by v474.05's rule: the advances it knows, plus one, times the rate. */
const costByAdvancesKnown = (context, playerResearch) => (0, exports.advancesKnown)(playerResearch) * (0, exports.rate)(context, playerResearch);
exports.costByAdvancesKnown = costByAdvancesKnown;
// v474.05 (OpenCivOne `CityWorker.cs` L3662-L3690). An advance costs `advances × R` bulbs, where R is 6 + 2 × level
//  for the human (never below 11 - advances, so the first few cost at least 11 a step) and 14 - level for the
//  computer players. From AD it costs twice as much, and everyone's R rises by up to 6 more when the leader is ahead of
//  schedule: the most advances anyone has, less one for every 9 turns played (`GameEngine.cs` L250-L256).
//
// see also: https://forums.civfanatics.com/threads/how-many-bulbs-need-for-the-current-tech.376195/#post-13810088
const getRules = (gameDifficultyRegistry = GameDifficultyRegistry_1.instance, clientRegistry = ClientRegistry_1.instance, playerResearchRegistry = PlayerResearchRegistry_1.instance, turn = Turn_1.instance, year = Year_1.instance) => [
    new Cost_1.default(RuleIds_1.COST_RULE, new Effect_1.default((CostAdvance, playerResearch) => (0, exports.costByAdvancesKnown)({
        gameDifficultyRegistry,
        clientRegistry,
        playerResearchRegistry,
        turn,
        year,
    }, playerResearch))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=cost.js.map