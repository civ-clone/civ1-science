import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import CivilDisorder from '@civ-clone/core-city-happiness/Rules/CivilDisorder';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import ProcessYield from '@civ-clone/core-city/Rules/ProcessYield';
import { Research } from '../../Yields';
import Yield from '@civ-clone/core-yield/Yield';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  ruleRegistry?: RuleRegistry
) => ProcessYield[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): ProcessYield[] => [
  new ProcessYield(
    new Criterion((cityYield: Yield): boolean => cityYield instanceof Research),
    new Criterion(
      (cityYield: Yield, city: City, yields: Yield[]) =>
        !ruleRegistry
          .process(CivilDisorder, city, yields)
          .some((result: boolean): boolean => result)
    ),
    new Effect((cityYield: Yield, city: City): void =>
      playerResearchRegistry.getByPlayer(city.player()).add(cityYield)
    )
  ),
];

export default getRules;
