/** An advance costs the advances known, plus one, times the rate: v474.05's research cost. */
export declare const COST_RULE = 'civ1-science:research/cost/by-advances-known';
/** The rate of research cost doubles from AD (civ-clone/web-renderer#1077). */
export declare const RATE_MULTIPLIER_RULE =
  'civ1-science:research/rate-multiplier/doubled-from-ad';
/** The rate rises when the leader is ahead of schedule, from AD (civ-clone/web-renderer#1077). */
export declare const CATCH_UP_RULE = 'civ1-science:research/catch-up/from-ad';
