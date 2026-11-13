"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const AdvanceRegistry_1 = require("@civ-clone/core-science/AdvanceRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const playerResearch_1 = require("@civ-clone/base-science-research/lib/playerResearch");
const Added_1 = require("@civ-clone/core-player/Rules/Added");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const core_random_1 = require("@civ-clone/core-random");
const getRules = (advanceRegistry = AdvanceRegistry_1.instance, playerResearchRegistry = PlayerResearchRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance, randomNumberGenerator = core_random_1.instance) => [
    new Added_1.default('civ1-science:player/added/register-player-research', new Effect_1.default((player) => (0, playerResearch_1.addPlayerResearch)(player, advanceRegistry, playerResearchRegistry, ruleRegistry))),
    // Up to three advances to start with, picked at random.
    new Added_1.default('civ1-science:player/added/starting-advances', new Effect_1.default((player) => (0, playerResearch_1.addStartingAdvances)(player, 4, randomNumberGenerator, playerResearchRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=added.js.map