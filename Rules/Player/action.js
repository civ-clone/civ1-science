"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Action_1 = require("@civ-clone/core-player/Rules/Action");
const PlayerActions_1 = require("../../PlayerActions");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance) => [
    new Action_1.default(new Criterion_1.default((player) => playerResearchRegistry.getByPlayer(player).researching() === null), new Criterion_1.default((player) => playerResearchRegistry.getByPlayer(player).available().length > 0), new Effect_1.default((player) => [
        new PlayerActions_1.ChooseResearch(player, playerResearchRegistry.getByPlayer(player)),
    ])),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=action.js.map