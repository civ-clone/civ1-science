import { AdvanceRegistry } from '@civ-clone/core-science/AdvanceRegistry';
import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Added from '@civ-clone/core-player/Rules/Added';
export declare const getRules: (
  advanceRegistry?: AdvanceRegistry,
  playerResearchRegistry?: PlayerResearchRegistry,
  ruleRegistry?: RuleRegistry,
  randomNumberGenerator?: () => number
) => Added[];
export default getRules;
