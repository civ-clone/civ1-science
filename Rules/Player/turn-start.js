"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.researchCostPriority = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Cost_1 = require("@civ-clone/core-science/Rules/Cost");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Priority_1 = require("@civ-clone/core-rule/Priority");
const TurnStart_1 = require("@civ-clone/core-player/Rules/TurnStart");
// What an advance costs depends on the year and on how far ahead the leader is (see `Rules/Research/cost`), so the cost
//  set when research began is worked out again each turn. Only the cost: `research()` would also start the advance over.
//
// Ahead of `High`, which is when `civ1-player` processes the cities' yields and so adds the turn's research: completion
//  is checked as it's added, so a cost worked out after that would let the first AD turn complete an advance at its BC
//  price.
exports.researchCostPriority = new Priority_1.default(900);
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) => [
    new TurnStart_1.default('civ1-science:player/turn-start/research-cost', exports.researchCostPriority, new Effect_1.default((player) => {
        const playerResearch = playerResearchRegistry.getByPlayer(player), researching = playerResearch.researching();
        if (researching === null) {
            return;
        }
        const [cost] = ruleRegistry.process(Cost_1.default, researching, playerResearch);
        if (typeof cost === 'number') {
            playerResearch.cost().set(cost);
        }
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=turn-start.js.map