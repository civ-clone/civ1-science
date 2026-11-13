"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerGovernmentRegistry_1 = require("@civ-clone/core-government/PlayerGovernmentRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Governments_1 = require("@civ-clone/civ1-government/Governments");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const ProcessYield_1 = require("@civ-clone/core-city/Rules/ProcessYield");
const Yields_1 = require("../../Yields");
const progress_1 = require("@civ-clone/base-science-research/lib/progress");
const governedBy_1 = require("@civ-clone/base-government-change/lib/governedBy");
const civilDisorder_1 = require("@civ-clone/base-city-happiness/lib/civilDisorder");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance, playerGovernmentRegistry = PlayerGovernmentRegistry_1.instance) => [
    new ProcessYield_1.default('civ1-science:city/process-yield/add-research', new Criterion_1.default((cityYield) => cityYield instanceof Yields_1.Research), new Criterion_1.default((cityYield, city, yields) => !(0, civilDisorder_1.default)(city, yields, ruleRegistry)), 
    // Under Anarchy no scientific research happens: p217, Wilson, J.L & Emrich A. (1992). Sid Meier's Civilization, or
    // Rome on 640K a Day. Rocklin, CA: Prima Publishing
    new Criterion_1.default((cityYield, city) => !(0, governedBy_1.default)(city.player(), [Governments_1.Anarchy], playerGovernmentRegistry)), new Effect_1.default((0, progress_1.addResearch)(playerResearchRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=process-yield.js.map