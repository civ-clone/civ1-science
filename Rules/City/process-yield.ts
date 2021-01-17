import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import City from '@civ-clone/core-city/City';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import ProcessYield from '@civ-clone/core-city/Rules/ProcessYield';
import { Research } from '../../Yields';
import Yield from '@civ-clone/core-yield/Yield';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry
) => ProcessYield[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance
): ProcessYield[] => [
  new ProcessYield(
    new Criterion((cityYield: Yield): boolean => cityYield instanceof Research),
    new Effect((cityYield: Yield, city: City): void => {
      playerResearchRegistry.getByPlayer(city.player()).add(cityYield);
    })
  ),
];

export default getRules;
