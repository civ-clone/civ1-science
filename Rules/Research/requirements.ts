import {
  AdvanceRegistry,
  instance as advanceRegistryInstance,
} from '@civ-clone/core-science/AdvanceRegistry';
import Advance from '@civ-clone/core-science/Advance';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import { FutureTechnology } from '../../Advances';
import Requirements from '@civ-clone/core-science/Rules/Requirements';
import knowsEveryNonRepeatableAdvance from '@civ-clone/base-science-advance-future-technology/lib/knowsEveryNonRepeatableAdvance';
import requiresAdvances from '../../Requirements';
import { requirementsRulesFor } from '@civ-clone/base-science-research/lib/requirements';

// The rule each entry is played by moved to base-science-research (civ-clone/web-renderer#1008): these are the same
//  functions.
export {
  deriveRequirementsRules,
  requirementsRulesFor,
} from '@civ-clone/base-science-research/lib/requirements';

/** Future Technology needs every advance that can't be repeated: not an edge of the graph, so a rule of its own. */
export const futureTechnology = (
  advanceRegistry: AdvanceRegistry = advanceRegistryInstance
): Requirements =>
  new Requirements(
    'civ1-science:research/requirements/FutureTechnology',
    new Criterion(
      (CheckAdvance: typeof Advance): boolean =>
        CheckAdvance === FutureTechnology
    ),
    new Effect(
      (CheckAdvance: typeof Advance, discoveredAdvances: Advance[]): boolean =>
        knowsEveryNonRepeatableAdvance(advanceRegistry, discoveredAdvances)
    )
  );

/**
 * Every rule about which advances a player can research, as `registerRules` registers them: one for each of
 * `Requirements`' entries, then Future Technology's. For a rule registry without a game's `requirements` (tests, and
 * rulesets that build on these): a game's are registered through `game.requirements`, so a plugin can change an entry
 * and its rule together.
 */
export const getRules: (advanceRegistry?: AdvanceRegistry) => Requirements[] = (
  advanceRegistry: AdvanceRegistry = advanceRegistryInstance
): Requirements[] => [
  ...requiresAdvances.flatMap(requirementsRulesFor),
  futureTechnology(advanceRegistry),
];

export default getRules;
