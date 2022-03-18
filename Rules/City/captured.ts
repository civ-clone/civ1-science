import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import Captured from '@civ-clone/core-city/Rules/Captured';
import City from '@civ-clone/core-city/City';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import Criterion from '@civ-clone/core-rule/Criterion';
import Advance from '@civ-clone/core-science/Advance';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry
) => Captured[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance
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
    // TODO: have `Player#chooseAdvance` or something
    new Effect(
      (capturedCity: City, capturingPlayer: Player, player: Player): void => {
        const capturingPlayerResearch =
          playerResearchRegistry.getByPlayer(capturingPlayer);
        const available = playerResearchRegistry
          .getByPlayer(player)
          .complete()
          .filter(
            (advance) =>
              !capturingPlayerResearch.completed(
                advance.constructor as typeof Advance
              )
          );

        capturingPlayerResearch.addAdvance(
          available.map((advance) => advance.constructor as typeof Advance)[
            Math.floor(Math.random() * available.length)
          ]
        );
      }
    )
  ),
];

export default getRules;
