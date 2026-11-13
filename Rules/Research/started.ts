import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import Effect from '@civ-clone/core-rule/Effect';
import Started from '@civ-clone/core-science/Rules/Started';
import { emitResearchStarted } from '@civ-clone/base-science-research/lib/events';

export const getRules: (engine?: Engine) => Started[] = (
  engine: Engine = engineInstance
): Started[] => [
  new Started(
    'civ1-science:research/started/emit',
    new Effect(emitResearchStarted(engine))
  ),
];

export default getRules;
