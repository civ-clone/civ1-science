import Advance from '@civ-clone/core-science/Advance';
import Cost from '@civ-clone/core-science/Rules/Cost';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';

// see: https://forums.civfanatics.com/threads/how-many-bulbs-need-for-the-current-tech.376195/#post-13810088
export const getRules: () => Cost[] = (): Cost[] => [
  new Cost(
    new Effect(
      (CostAdvance: typeof Advance, playerResearch: PlayerResearch): number =>
        (playerResearch.complete().length + 1) *
        (6 +
          2 *
            // playerResearch.player()
            //   .difficultyLevel ||
            0)
    )
  ),
];

export default getRules;
