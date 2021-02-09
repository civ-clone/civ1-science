import Advance from '@civ-clone/core-science/Advance';
import Started from '@civ-clone/core-science/Rules/Started';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import { instance as engine } from '@civ-clone/core-engine/Engine';

export const getRules: () => Started[] = (): Started[] => [
  new Started(
    new Effect((playerResearch: PlayerResearch, advance: Advance): void => {
      engine.emit('player:research', playerResearch, advance);
    })
  ),
];

export default getRules;
