"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./Rules/Player/action");
const added_1 = require("./Rules/Player/added");
const captured_1 = require("./Rules/City/captured");
const complete_1 = require("./Rules/Research/complete");
const cost_1 = require("./Rules/Research/cost");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const process_yield_1 = require("./Rules/City/process-yield");
const requirements_1 = require("./Rules/Research/requirements");
const started_1 = require("./Rules/Research/started");
RuleRegistry_1.instance.register(...(0, action_1.default)(), ...(0, added_1.default)(), ...(0, captured_1.default)(), ...(0, complete_1.default)(), ...(0, cost_1.default)(), ...(0, process_yield_1.default)(), ...(0, requirements_1.default)(), ...(0, started_1.default)());
//# sourceMappingURL=registerRules.js.map