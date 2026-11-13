"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.futureTechnology = exports.requirementsRulesFor = exports.deriveRequirementsRules = void 0;
const AdvanceRegistry_1 = require("@civ-clone/core-science/AdvanceRegistry");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Advances_1 = require("../../Advances");
const Requirements_1 = require("@civ-clone/core-science/Rules/Requirements");
const knowsEveryNonRepeatableAdvance_1 = require("@civ-clone/base-science-advance-future-technology/lib/knowsEveryNonRepeatableAdvance");
const Requirements_2 = require("../../Requirements");
const requirements_1 = require("@civ-clone/base-science-research/lib/requirements");
// The rule each entry is played by moved to base-science-research (civ-clone/web-renderer#1008): these are the same
//  functions.
var requirements_2 = require("@civ-clone/base-science-research/lib/requirements");
Object.defineProperty(exports, "deriveRequirementsRules", { enumerable: true, get: function () { return requirements_2.deriveRequirementsRules; } });
Object.defineProperty(exports, "requirementsRulesFor", { enumerable: true, get: function () { return requirements_2.requirementsRulesFor; } });
/** Future Technology needs every advance that can't be repeated: not an edge of the graph, so a rule of its own. */
const futureTechnology = (advanceRegistry = AdvanceRegistry_1.instance) => new Requirements_1.default('civ1-science:research/requirements/FutureTechnology', new Criterion_1.default((CheckAdvance) => CheckAdvance === Advances_1.FutureTechnology), new Effect_1.default((CheckAdvance, discoveredAdvances) => (0, knowsEveryNonRepeatableAdvance_1.default)(advanceRegistry, discoveredAdvances)));
exports.futureTechnology = futureTechnology;
/**
 * Every rule about which advances a player can research, as `registerRules` registers them: one for each of
 * `Requirements`' entries, then Future Technology's. For a rule registry without a game's `requirements` (tests, and
 * rulesets that build on these): a game's are registered through `game.requirements`, so a plugin can change an entry
 * and its rule together.
 */
const getRules = (advanceRegistry = AdvanceRegistry_1.instance) => [
    ...Requirements_2.default.flatMap(requirements_1.requirementsRulesFor),
    (0, exports.futureTechnology)(advanceRegistry),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=requirements.js.map