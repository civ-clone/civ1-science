import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import Rule from '@civ-clone/core-rule/Rule';
/**
 * Whether a player's rate of research cost rises when the leader is ahead of schedule (civ-clone/web-renderer#1077):
 * v474.05's from AD. The first rule that applies decides; with none, it doesn't.
 */
export declare class CatchUp extends Rule<[PlayerResearch], boolean> {}
export default CatchUp;
