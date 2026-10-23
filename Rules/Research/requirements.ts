import {
  AdvanceRegistry,
  instance as advanceRegistryInstance,
} from '@civ-clone/core-science/AdvanceRegistry';
import {
  Requirement,
  Target,
  met,
} from '@civ-clone/core-requirement/Requirement';
import Advance from '@civ-clone/core-science/Advance';
import Criterion from '@civ-clone/core-rule/Criterion';
import { Deriver } from '@civ-clone/core-requirement/RequirementRegistry';
import Effect from '@civ-clone/core-rule/Effect';
import { FutureTechnology } from '../../Advances';
import Requirements from '@civ-clone/core-science/Rules/Requirements';
import requiresAdvances from '../../Requirements';

/** The rule `entry` is played by: its subject can be researched once the player has discovered the advances it needs. */
export const requirementsRulesFor = (entry: Requirement): Requirements[] =>
  entry.relation === 'requires'
    ? [
        new Requirements(
          entry.id,
          new Criterion(
            (CheckAdvance: typeof Advance): boolean =>
              CheckAdvance === entry.subject
          ),
          new Effect(
            (
              CheckAdvance: typeof Advance,
              discoveredAdvances: Advance[]
            ): boolean =>
              met(entry, (target: Target): boolean =>
                discoveredAdvances.some(
                  (advance: Advance): boolean =>
                    advance instanceof (target as typeof Advance)
                )
              )
          )
        ),
      ]
    : [];

/** What `registerRules` gives the game's `requirements` to make each entry's rule with. */
export const deriveRequirementsRules: Deriver = (
  entry: Requirement
): Requirements[] => requirementsRulesFor(entry);

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
        advanceRegistry
          .filter(
            (AdvanceType: typeof Advance): boolean => !AdvanceType.repeatable
          )
          .every((AdvanceType): boolean =>
            discoveredAdvances.some(
              (advance: Advance): boolean => advance instanceof AdvanceType
            )
          )
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
