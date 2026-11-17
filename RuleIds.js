"use strict";
// The ids of this package's rules that another package is expected to name (civ-clone/web-renderer#954): a set that
//  supersedes one, or a host that switches or describes it. Imported, a rename breaks the other package's build.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATCH_UP_RULE = exports.RATE_MULTIPLIER_RULE = exports.COST_RULE = void 0;
/** An advance costs the advances known, plus one, times the rate: v474.05's research cost. */
exports.COST_RULE = 'civ1-science:research/cost/by-advances-known';
/** The rate of research cost doubles from AD (civ-clone/web-renderer#1077). */
exports.RATE_MULTIPLIER_RULE = 'civ1-science:research/rate-multiplier/doubled-from-ad';
/** The rate rises when the leader is ahead of schedule, from AD (civ-clone/web-renderer#1077). */
exports.CATCH_UP_RULE = 'civ1-science:research/catch-up/from-ad';
//# sourceMappingURL=RuleIds.js.map