import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import Complete from '@civ-clone/core-science/Rules/Complete';
import Effect from '@civ-clone/core-rule/Effect';
import { emitResearchComplete } from '@civ-clone/base-science-research/lib/events';

export const getRules: (engine?: Engine) => Complete[] = (
  engine: Engine = engineInstance
): Complete[] => [
  new Complete(
    'civ1-science:research/complete/emit',
    new Effect(emitResearchComplete(engine))
  ),
];

export default getRules;
