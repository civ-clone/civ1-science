import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Effect from '@civ-clone/core-rule/Effect';
import Priority from '@civ-clone/core-rule/Priority';
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';
import { updateResearchCost } from '@civ-clone/base-science-research/lib/progress';

// What an advance costs depends on the year and on how far ahead the leader is (see `Rules/Research/cost`), so the cost
//  set when research began is worked out again each turn. Only the cost: `research()` would also start the advance over.
//
// Ahead of `High`, which is when `civ1-player` processes the cities' yields and so adds the turn's research: completion
//  is checked as it's added, so a cost worked out after that would let the first AD turn complete an advance at its BC
//  price.
export const researchCostPriority = new Priority(900);

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  ruleRegistry?: RuleRegistry
) => TurnStart[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): TurnStart[] => [
  new TurnStart(
    'civ1-science:player/turn-start/research-cost',
    researchCostPriority,
    new Effect(updateResearchCost(playerResearchRegistry, ruleRegistry))
  ),
];

export default getRules;
