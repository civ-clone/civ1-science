"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Added_1 = require("@civ-clone/core-player/Rules/Added");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const PlayerResearch_1 = require("@civ-clone/core-science/PlayerResearch");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance) => [
    new Added_1.default(new Effect_1.default((player) => playerResearchRegistry.register(new PlayerResearch_1.default(player)))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=added.js.map