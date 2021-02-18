"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./Rules/Player/action");
const added_1 = require("./Rules/Player/added");
const cost_1 = require("./Rules/Research/cost");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const process_yield_1 = require("./Rules/City/process-yield");
const requirements_1 = require("./Rules/Research/requirements");
const research_1 = require("./Rules/Player/research");
const research_complete_1 = require("./Rules/Player/research-complete");
RuleRegistry_1.instance.register(...action_1.default(), ...added_1.default(), ...cost_1.default(), ...process_yield_1.default(), ...requirements_1.default(), ...research_1.default(), ...research_complete_1.default());
//# sourceMappingURL=registerRules.js.map