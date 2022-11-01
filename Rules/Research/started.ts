import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import Advance from '@civ-clone/core-science/Advance';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import Started from '@civ-clone/core-science/Rules/Started';

export const getRules: (engine?: Engine) => Started[] = (
  engine: Engine = engineInstance
): Started[] => [
  new Started(
    new Effect(
      (
        playerResearch: PlayerResearch,
        AdvanceToResearch: typeof Advance
      ): void => {
        engine.emit('player:research', playerResearch, AdvanceToResearch);
      }
    )
  ),
];

export default getRules;
