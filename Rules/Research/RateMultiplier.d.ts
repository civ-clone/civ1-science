import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import Rule from '@civ-clone/core-rule/Rule';
/**
 * What a player's rate of research cost is multiplied by now (civ-clone/web-renderer#1077): v474.05's doubles it from
 * AD. The first rule that applies decides; with none, it is v474.05's.
 */
export declare class RateMultiplier extends Rule<[PlayerResearch], number> {}
export default RateMultiplier;
