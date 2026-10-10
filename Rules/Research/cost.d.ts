import { ClientRegistry } from '@civ-clone/core-client/ClientRegistry';
import { GameDifficultyRegistry } from '@civ-clone/core-difficulty/GameDifficultyRegistry';
import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import { Year } from '@civ-clone/core-game-year/Year';
import Cost from '@civ-clone/core-science/Rules/Cost';
export declare const getRules: (
  gameDifficultyRegistry?: GameDifficultyRegistry,
  clientRegistry?: ClientRegistry,
  playerResearchRegistry?: PlayerResearchRegistry,
  turn?: Turn,
  year?: Year
) => Cost[];
export default getRules;
