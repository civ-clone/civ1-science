import {
  AdvanceRegistry,
  instance as advanceRegistryInstance,
} from '@civ-clone/core-science/AdvanceRegistry';
import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  addPlayerResearch,
  addStartingAdvances,
} from '@civ-clone/base-science-research/lib/playerResearch';
import Added from '@civ-clone/core-player/Rules/Added';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import { instance as rngInstance } from '@civ-clone/core-random';

export const getRules: (
  advanceRegistry?: AdvanceRegistry,
  playerResearchRegistry?: PlayerResearchRegistry,
  ruleRegistry?: RuleRegistry,
  randomNumberGenerator?: () => number
) => Added[] = (
  advanceRegistry: AdvanceRegistry = advanceRegistryInstance,
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  ruleRegistry: RuleRegistry = ruleRegistryInstance,
  randomNumberGenerator: () => number = rngInstance
): Added[] => [
  new Added(
    'civ1-science:player/added/register-player-research',
    new Effect((player: Player): void =>
      addPlayerResearch(
        player,
        advanceRegistry,
        playerResearchRegistry,
        ruleRegistry
      )
    )
  ),
  // Up to three advances to start with, picked at random.
  new Added(
    'civ1-science:player/added/starting-advances',
    new Effect((player: Player): void =>
      addStartingAdvances(
        player,
        4,
        randomNumberGenerator,
        playerResearchRegistry
      )
    )
  ),
];

export default getRules;
