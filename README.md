# civ1-science

This repo aims to pull together the `Advance`s and `Rule`s that form the basis for the functionality of science
comparable to that of the original Civilization game.

A player is counted as knowing only the advances gained in play, not those it started with
(`civ1-science:research/advance-count/gained-in-play`, `ADVANCE_COUNT_RULE`), as v474.05's `tech_count` counts them,
for the research cost, its floor and catch-up, and for `civ1-power`'s ranking and `civ1-city-improvement`'s pollution.
The cost falls back to that count when no `AdvanceCount` rule answers; `core-science`'s `advanceCount`, which the other
two ask, falls back to every advance known, but this package always registers its rule (civ-clone/web-renderer#973).
