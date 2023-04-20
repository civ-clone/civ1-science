import { ClientRegistry } from '@civ-clone/core-client/ClientRegistry';
import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import Advance from '@civ-clone/core-science/Advance';
import Captured from '@civ-clone/core-city/Rules/Captured';
declare global {
  interface ChoiceMetaDataMap {
    'capture-city.steal-advance': typeof Advance;
  }
}
export declare const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  randomNumberGenerator?: () => number,
  clientRegistry?: ClientRegistry
) => Captured[];
export default getRules;
