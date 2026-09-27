import {
  PlayerGovernmentRegistry,
  instance as playerGovernmentRegistryInstance,
} from '@civ-clone/core-government/PlayerGovernmentRegistry';
import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { Anarchy } from '@civ-clone/civ1-government/Governments';
import City from '@civ-clone/core-city/City';
import CivilDisorder from '@civ-clone/core-city-happiness/Rules/CivilDisorder';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import ProcessYield from '@civ-clone/core-city/Rules/ProcessYield';
import { Research } from '../../Yields';
import Yield from '@civ-clone/core-yield/Yield';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  ruleRegistry?: RuleRegistry,
  playerGovernmentRegistry?: PlayerGovernmentRegistry
) => ProcessYield[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  playerGovernmentRegistry: PlayerGovernmentRegistry = playerGovernmentRegistryInstance
): ProcessYield[] => [
  new ProcessYield(
    'civ1-science:city/process-yield/add-research',
    new Criterion((cityYield: Yield): boolean => cityYield instanceof Research),
    new Criterion(
      (cityYield: Yield, city: City, yields: Yield[]) =>
        !ruleRegistry
          .process(CivilDisorder, city, yields)
          .some((result: boolean): boolean => result)
    ),
    // Under Anarchy no scientific research happens: p217, Wilson, J.L & Emrich A. (1992). Sid Meier's Civilization, or
    // Rome on 640K a Day. Rocklin, CA: Prima Publishing
    new Criterion(
      (cityYield: Yield, city: City): boolean =>
        !playerGovernmentRegistry
          .getBy('player', city.player())
          .some((playerGovernment) => playerGovernment.is(Anarchy))
    ),
    new Effect((cityYield: Yield, city: City): void =>
      playerResearchRegistry.getByPlayer(city.player()).add(cityYield)
    )
  ),
];

export default getRules;
