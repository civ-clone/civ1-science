import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import Captured from '@civ-clone/core-city/Rules/Captured';
export declare const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  randomNumberGenerator?: () => number
) => Captured[];
export default getRules;
