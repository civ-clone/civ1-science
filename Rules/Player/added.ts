import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import Added from '@civ-clone/core-player/Rules/Added';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry
) => Added[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance
): Added[] => [
  new Added(
    new Effect((player: Player): void =>
      playerResearchRegistry.register(new PlayerResearch(player))
    )
  ),
  new Added(
    new Effect((player: Player): void => {
      const playerResearch = playerResearchRegistry.getByPlayer(player);

      for (let i = 0, max = Math.floor(4 * Math.random()); i < max; i++) {
        const available = playerResearch.available();

        playerResearch.addAdvance(
          available[Math.floor(Math.random() * available.length)]
        );
      }
    })
  ),
];

export default getRules;
