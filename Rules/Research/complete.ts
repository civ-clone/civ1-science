import {
  Engine,
  instance as engineInstance,
} from '@civ-clone/core-engine/Engine';
import Advance from '@civ-clone/core-science/Advance';
import Complete from '@civ-clone/core-science/Rules/Complete';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';

export const getRules: (engine?: Engine) => Complete[] = (
  engine: Engine = engineInstance
): Complete[] => [
  new Complete(
    new Effect((playerResearch: PlayerResearch, advance: Advance): void => {
      engine.emit('player:research-complete', playerResearch, advance);
    })
  ),
];

export default getRules;
