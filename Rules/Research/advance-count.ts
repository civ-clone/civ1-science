import { ADVANCE_COUNT_RULE } from '../../RuleIds';
import AdvanceCount from '@civ-clone/core-science/Rules/AdvanceCount';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import gainedInPlay from '@civ-clone/base-science-research/lib/count';

// v474.05 counts each civilization's advances in `tech_count`: 1 when it's founded (civd `NEWGAME.C` `init_civ()`,
//  which resets it after any advances a civilization joining mid-game is given), and one more for each advance gained
//  once the first turn has passed (`ECONOMY.C` `give_advance()`), Future Technologies and advances taken from others
//  included. So the advances a civilization starts with never count, nor those a civilization brought back to life
//  inherits (`civ1-game-end`'s respawn adds them as starting advances). The research cost (`./cost`), the power ranking
//  (`civ1-power`) and the chance of pollution (`civ1-city-improvement`) all read it. This is the count without the 1,
//  which each of those adds.
//
// One difference: v474.05 counts nothing gained in its first turn (`turn_tick` 0), which is our turn 1, so an advance
//  from a goody hut entered on the first turn counts here and not there. It needs a Settlers to start beside a hut.
export const getRules: () => AdvanceCount[] = (): AdvanceCount[] => [
  new AdvanceCount(
    ADVANCE_COUNT_RULE,
    new Effect((playerResearch: PlayerResearch): number =>
      gainedInPlay(playerResearch)
    )
  ),
];

export default getRules;
