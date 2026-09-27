"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Governments_1 = require("@civ-clone/civ1-government/Governments");
const CivilDisorder_1 = require("@civ-clone/core-city-happiness/Rules/CivilDisorder");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const ProcessYield_1 = require("@civ-clone/core-city/Rules/ProcessYield");
const Yields_1 = require("../../Yields");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance, playerGovernmentRegistry = PlayerGovernmentRegistry_1.instance) => [
    new ProcessYield_1.default('civ1-science:city/process-yield/add-research', new Criterion_1.default((cityYield) => cityYield instanceof Yields_1.Research), new Criterion_1.default((cityYield, city, yields) => !ruleRegistry
        .process(CivilDisorder_1.default, city, yields)
        .some((result) => result)), 
    // Under Anarchy no scientific research happens: p217, Wilson, J.L & Emrich A. (1992). Sid Meier's Civilization, or
    // Rome on 640K a Day. Rocklin, CA: Prima Publishing
    new Criterion_1.default((cityYield, city) => !playerGovernmentRegistry
        .getBy('player', city.player())
        .some((playerGovernment) => playerGovernment.is(Governments_1.Anarchy))), new Effect_1.default((cityYield, city) => playerResearchRegistry.getByPlayer(city.player()).add(cityYield))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=process-yield.js.map