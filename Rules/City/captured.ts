import {
  ClientRegistry,
  instance as clientRegistryInstance,
} from '@civ-clone/core-client/ClientRegistry';
import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  hasAdvanceToTake,
  takeAdvance,
} from '@civ-clone/base-science-research/lib/captured';
import Advance from '@civ-clone/core-science/Advance';
import Captured from '@civ-clone/core-city/Rules/Captured';
import City from '@civ-clone/core-city/City';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import isBarbarian from '@civ-clone/base-civilization-barbarian/isBarbarian';
import { instance as rngInstance } from '@civ-clone/core-random';

declare global {
  interface ChoiceMetaDataMap {
    'capture-city.steal-advance': typeof Advance;
  }
}

export const getRules = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  randomNumberGenerator: () => number = rngInstance,
  clientRegistry: ClientRegistry = clientRegistryInstance
): Captured[] => [
  new Captured(
    'civ1-science:city/captured/steal-advance',
    // Barbarians take no advance from a city, and none can be taken from them (civ-clone/web-renderer#169).
    new Criterion(
      (capturedCity: City, capturingPlayer: Player, player: Player): boolean =>
        !isBarbarian(capturingPlayer) && !isBarbarian(player)
    ),
    new Criterion(hasAdvanceToTake(playerResearchRegistry)),
    new Effect(takeAdvance(playerResearchRegistry, clientRegistry))
  ),
];

export default getRules;
