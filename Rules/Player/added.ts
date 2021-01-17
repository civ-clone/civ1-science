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
];

export default getRules;
