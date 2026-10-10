"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const ClientRegistry_1 = require("@civ-clone/core-client/ClientRegistry");
const GameDifficultyRegistry_1 = require("@civ-clone/core-difficulty/GameDifficultyRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Turn_1 = require("@civ-clone/core-turn-based-game/Turn");
const Year_1 = require("@civ-clone/core-game-year/Year");
const Cost_1 = require("@civ-clone/core-science/Rules/Cost");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const isHuman_1 = require("@civ-clone/civ1-difficulty/isHuman");
const level_1 = require("@civ-clone/civ1-difficulty/level");
// Advances count from 1, without the free Mining, Irrigation and Roads, as v474.05 counts them.
const advancesKnown = (playerResearch) => playerResearch.complete().length + 1;
const isAD = (year) => {
    try {
        return year.value() >= 0;
    }
    catch (e) {
        // A game with no `YearRule` has no year: count it as BC.
        return false;
    }
};
// v474.05 (OpenCivOne `CityWorker.cs` L3662-L3690). An advance costs `advances × R` bulbs, where R is 6 + 2 × level
//  for the human (never below 11 - advances, so the first few cost at least 11 a step) and 14 - level for the
//  computer players. From AD it costs twice as much, and everyone's R rises by up to 6 more when the leader is ahead of
//  schedule: the most advances anyone has, less one for every 9 turns played (`GameEngine.cs` L250-L256).
//
// see also: https://forums.civfanatics.com/threads/how-many-bulbs-need-for-the-current-tech.376195/#post-13810088
const getRules = (gameDifficultyRegistry = GameDifficultyRegistry_1.instance, clientRegistry = ClientRegistry_1.instance, playerResearchRegistry = PlayerResearchRegistry_1.instance, turn = Turn_1.instance, year = Year_1.instance) => [
    new Cost_1.default('civ1-science:research/cost/by-advances-known', new Effect_1.default((CostAdvance, playerResearch) => {
        const level = (0, level_1.levelOf)(gameDifficultyRegistry), human = (0, isHuman_1.default)(playerResearch.player(), clientRegistry), advances = advancesKnown(playerResearch), ad = isAD(year), catchUp = ad
            ? Math.min(Math.max(Math.max(advances, ...playerResearchRegistry
                .entries()
                .map((research) => advancesKnown(research))) - Math.floor(turn.value() / 9), 0), 6)
            : 0, ratio = (human ? 6 + 2 * level : 14 - level) + catchUp;
        return (advances *
            (human ? Math.max(ratio, 11 - advances) : ratio) *
            (ad ? 2 : 1));
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=cost.js.map