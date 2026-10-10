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
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';

// What an advance costs depends on the year and on how far ahead the leader is (see `Rules/Research/cost`), so the cost
//  set when research began is worked out again each turn. Only the cost: `research()` would also start the advance over.
export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  ruleRegistry?: RuleRegistry
) => TurnStart[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance
): TurnStart[] => [
  new TurnStart(
    'civ1-science:player/turn-start/research-cost',
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
