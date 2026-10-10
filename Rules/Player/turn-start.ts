import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Cost from '@civ-clone/core-science/Rules/Cost';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import Priority from '@civ-clone/core-rule/Priority';
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';

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
    new Effect((player: Player): void => {
      const playerResearch = playerResearchRegistry.getByPlayer(player),
        researching = playerResearch.researching();

      if (researching === null) {
        return;
      }

      const [cost] = ruleRegistry.process(Cost, researching, playerResearch);

      if (typeof cost === 'number') {
        playerResearch.cost().set(cost);
      }
    })
  ),
];

export default getRules;
