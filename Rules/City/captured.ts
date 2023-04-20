import {
  ClientRegistry,
  instance as clientRegistryInstance,
} from '@civ-clone/core-client/ClientRegistry';
import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import Advance from '@civ-clone/core-science/Advance';
import Captured from '@civ-clone/core-city/Rules/Captured';
import ChoiceMeta from '@civ-clone/core-client/ChoiceMeta';
import City from '@civ-clone/core-city/City';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';

declare global {
  interface ChoiceMetaDataMap {
    'capture-city.steal-advance': typeof Advance;
  }
}

export const getRules = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  randomNumberGenerator: () => number = () => Math.random(),
  clientRegistry: ClientRegistry = clientRegistryInstance
): Captured[] => [
  new Captured(
    new Criterion(
      (capturedCity: City, capturingPlayer: Player, player: Player): boolean =>
        playerResearchRegistry
          .getByPlayer(player)
          .complete()
          .some(
            (advance) =>
              !playerResearchRegistry
                .getByPlayer(capturingPlayer)
                .completed(advance.constructor as typeof Advance)
          )
    ),
    new Effect(
      async (
        capturedCity: City,
        capturingPlayer: Player,
        player: Player
      ): Promise<void> => {
        const capturingPlayerResearch =
          playerResearchRegistry.getByPlayer(capturingPlayer);
        const available = playerResearchRegistry
            .getByPlayer(player)
            .complete()
            .map((advance) => advance.sourceClass() as typeof Advance)
            .filter(
              (AdvanceType) => !capturingPlayerResearch.completed(AdvanceType)
            ),
          client = clientRegistry.getByPlayer(capturingPlayer),
          ChosenAdvance = await client.chooseFromList(
            new ChoiceMeta(
              available,
              'capture-city.steal-advance',
              capturedCity
            )
          );

        capturingPlayerResearch.addAdvance(ChosenAdvance);
      }
    )
  ),
];

export default getRules;
