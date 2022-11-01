import {
  AdvanceRegistry,
  instance as advanceRegistryInstance,
} from '@civ-clone/core-science/AdvanceRegistry';
import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Added from '@civ-clone/core-player/Rules/Added';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';

export const getRules: (
  advanceRegistry?: AdvanceRegistry,
  playerResearchRegistry?: PlayerResearchRegistry,
  ruleRegistry?: RuleRegistry,
  randomNumberGenerator?: () => number
) => Added[] = (
  advanceRegistry: AdvanceRegistry = advanceRegistryInstance,
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  randomNumberGenerator: () => number = () => Math.random()
): Added[] => [
  new Added(
    new Effect((player: Player): void =>
      playerResearchRegistry.register(
        new PlayerResearch(player, advanceRegistry, ruleRegistry)
      )
    )
  ),
  new Added(
    new Effect((player: Player): void => {
      const playerResearch = playerResearchRegistry.getByPlayer(player);

      for (
        let i = 0,
          max = Math.min(
            playerResearch.available().length,
            Math.floor(4 * randomNumberGenerator())
          );
        i < max;
        i++
      ) {
        const available = playerResearch.available();

        playerResearch.addAdvance(
          available[Math.floor(randomNumberGenerator() * available.length)]
        );
      }
    })
  ),
];

export default getRules;
