"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Added_1 = require("@civ-clone/core-player/Rules/Added");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const PlayerResearch_1 = require("@civ-clone/core-science/PlayerResearch");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance) => [
    new Added_1.default(new Effect_1.default((player) => playerResearchRegistry.register(new PlayerResearch_1.default(player)))),
    new Added_1.default(new Effect_1.default((player) => {
        const playerResearch = playerResearchRegistry.getByPlayer(player);
        for (let i = 0, max = Math.min(playerResearch.available().length, Math.floor(4 * Math.random())); i < max; i++) {
            const available = playerResearch.available();
            playerResearch.addAdvance(available[Math.floor(Math.random() * available.length)]);
        }
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=added.js.map