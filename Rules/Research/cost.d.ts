import { ClientRegistry } from '@civ-clone/core-client/ClientRegistry';
import { GameDifficultyRegistry } from '@civ-clone/core-difficulty/GameDifficultyRegistry';
import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import { Year } from '@civ-clone/core-game-year/Year';
import Cost from '@civ-clone/core-science/Rules/Cost';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
export declare const advancesKnown: (playerResearch: PlayerResearch) => number;
/** What the rate of research costs is read from: the game's difficulty, its players' clients and research, and when. */
export interface CostContext {
  gameDifficultyRegistry: GameDifficultyRegistry;
  clientRegistry: ClientRegistry;
  playerResearchRegistry: PlayerResearchRegistry;
  turn: Turn;
  year: Year;
}
/**
 * What each step of an advance costs `playerResearch` now, in bulbs: R, with catch-up, doubled from AD (see below).
 * `floor`: whether the human's R is held at 11 - advances for the first few, as v474.05's is. A cost that isn't a
 * number of advances times the rate (civ1-enhanced's tiers, civ-clone/web-renderer#1072) leaves it out.
 */
export declare const rate: (
  {
    gameDifficultyRegistry,
    clientRegistry,
    playerResearchRegistry,
    turn,
    year,
  }: CostContext,
  playerResearch: PlayerResearch,
  floor?: boolean
) => number;
/** What an advance costs `playerResearch` by v474.05's rule: the advances it knows, plus one, times the rate. */
export declare const costByAdvancesKnown: (
  context: CostContext,
  playerResearch: PlayerResearch
) => number;
export declare const getRules: (
  gameDifficultyRegistry?: GameDifficultyRegistry,
  clientRegistry?: ClientRegistry,
  playerResearchRegistry?: PlayerResearchRegistry,
  turn?: Turn,
  year?: Year
) => Cost[];
export default getRules;
