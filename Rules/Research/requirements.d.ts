import { AdvanceRegistry } from '@civ-clone/core-science/AdvanceRegistry';
import Requirements from '@civ-clone/core-science/Rules/Requirements';
export {
  deriveRequirementsRules,
  requirementsRulesFor,
} from '@civ-clone/base-science-research/lib/requirements';
/** Future Technology needs every advance that can't be repeated: not an edge of the graph, so a rule of its own. */
export declare const futureTechnology: (
  advanceRegistry?: AdvanceRegistry
) => Requirements;
/**
 * Every rule about which advances a player can research, as `registerRules` registers them: one for each of
 * `Requirements`' entries, then Future Technology's. For a rule registry without a game's `requirements` (tests, and
 * rulesets that build on these): a game's are registered through `game.requirements`, so a plugin can change an entry
 * and its rule together.
 */
export declare const getRules: (
  advanceRegistry?: AdvanceRegistry
) => Requirements[];
export default getRules;
