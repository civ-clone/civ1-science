"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const ProcessYield_1 = require("@civ-clone/core-city/Rules/ProcessYield");
const Yields_1 = require("../../Yields");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance) => [
    new ProcessYield_1.default(new Criterion_1.default((cityYield) => cityYield instanceof Yields_1.Research), new Effect_1.default((cityYield, city) => playerResearchRegistry.getByPlayer(city.player()).add(cityYield))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=process-yield.js.map