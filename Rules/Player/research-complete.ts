import Advance from '@civ-clone/core-science/Advance';
import Complete from '@civ-clone/core-science/Rules/Complete';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import { instance as engine } from '@civ-clone/core-engine/Engine';

export const getRules: () => Complete[] = (): Complete[] => [
  new Complete(
    new Effect((playerResearch: PlayerResearch, advance: Advance): void => {
      engine.emit('player:research-complete', playerResearch, advance);
    })
  ),
];

export default getRules;
