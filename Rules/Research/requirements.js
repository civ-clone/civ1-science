"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = exports.futureTechnology = exports.deriveRequirementsRules = exports.requirementsRulesFor = void 0;
const AdvanceRegistry_1 = require("@civ-clone/core-science/AdvanceRegistry");
const Requirement_1 = require("@civ-clone/core-requirement/Requirement");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Advances_1 = require("../../Advances");
const Requirements_1 = require("@civ-clone/core-science/Rules/Requirements");
const Requirements_2 = require("../../Requirements");
/** The rule `entry` is played by: its subject can be researched once the player has discovered the advances it needs. */
const requirementsRulesFor = (entry) => entry.relation === 'requires'
    ? [
        new Requirements_1.default(entry.id, new Criterion_1.default((CheckAdvance) => CheckAdvance === entry.subject), new Effect_1.default((CheckAdvance, discoveredAdvances) => (0, Requirement_1.met)(entry, (target) => discoveredAdvances.some((advance) => advance instanceof target)))),
    ]
    : [];
exports.requirementsRulesFor = requirementsRulesFor;
/** What `registerRules` gives the game's `requirements` to make each entry's rule with. */
const deriveRequirementsRules = (entry) => (0, exports.requirementsRulesFor)(entry);
exports.deriveRequirementsRules = deriveRequirementsRules;
/** Future Technology needs every advance that can't be repeated: not an edge of the graph, so a rule of its own. */
const futureTechnology = (advanceRegistry = AdvanceRegistry_1.instance) => new Requirements_1.default('civ1-science:research/requirements/FutureTechnology', new Criterion_1.default((CheckAdvance) => CheckAdvance === Advances_1.FutureTechnology), new Effect_1.default((CheckAdvance, discoveredAdvances) => advanceRegistry
    .filter((AdvanceType) => !AdvanceType.repeatable)
    .every((AdvanceType) => discoveredAdvances.some((advance) => advance instanceof AdvanceType))));
exports.futureTechnology = futureTechnology;
/**
 * Every rule about which advances a player can research, as `registerRules` registers them: one for each of
 * `Requirements`' entries, then Future Technology's. For a rule registry without a game's `requirements` (tests, and
 * rulesets that build on these): a game's are registered through `game.requirements`, so a plugin can change an entry
 * and its rule together.
 */
const getRules = (advanceRegistry = AdvanceRegistry_1.instance) => [
    ...Requirements_2.default.flatMap(exports.requirementsRulesFor),
    (0, exports.futureTechnology)(advanceRegistry),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=requirements.js.map