// The ids of this package's rules that another package is expected to name (civ-clone/web-renderer#954): a set that
//  supersedes one, or a host that switches or describes it. Imported, a rename breaks the other package's build.

/** An advance costs the advances known, plus one, times the rate: v474.05's research cost. */
export const COST_RULE = 'civ1-science:research/cost/by-advances-known';

/** The rate of research cost doubles from AD (civ-clone/web-renderer#1077). */
export const RATE_MULTIPLIER_RULE =
  'civ1-science:research/rate-multiplier/doubled-from-ad';

/** The rate rises when the leader is ahead of schedule, from AD (civ-clone/web-renderer#1077). */
export const CATCH_UP_RULE = 'civ1-science:research/catch-up/from-ad';

/**
 * A player is counted as knowing only the advances gained in play, not those it started with, as v474.05 counts
 *  `tech_count` for research costs and the power ranking (civ-clone/web-renderer#973).
 */
export const ADVANCE_COUNT_RULE =
  'civ1-science:research/advance-count/gained-in-play';
