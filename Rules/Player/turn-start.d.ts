import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';
export declare const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry,
  ruleRegistry?: RuleRegistry
) => TurnStart[];
export default getRules;
