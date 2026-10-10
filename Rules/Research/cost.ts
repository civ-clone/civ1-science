import {
  ClientRegistry,
  instance as clientRegistryInstance,
} from '@civ-clone/core-client/ClientRegistry';
import {
  GameDifficultyRegistry,
  instance as gameDifficultyRegistryInstance,
} from '@civ-clone/core-difficulty/GameDifficultyRegistry';
import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  Turn,
  instance as turnInstance,
} from '@civ-clone/core-turn-based-game/Turn';
import { Year, instance as yearInstance } from '@civ-clone/core-game-year/Year';
import Advance from '@civ-clone/core-science/Advance';
import Cost from '@civ-clone/core-science/Rules/Cost';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import isHuman from '@civ-clone/civ1-difficulty/isHuman';
import { levelOf } from '@civ-clone/civ1-difficulty/level';

// Advances count from 1, without the free Mining, Irrigation and Roads, as v474.05 counts them.
const advancesKnown = (playerResearch: PlayerResearch): number =>
  playerResearch.complete().length + 1;

const isAD = (year: Year): boolean => {
  try {
    return year.value() >= 0;
  } catch (e) {
    // A game with no `YearRule` has no year: count it as BC.
    return false;
  }
};

// v474.05 (OpenCivOne `CityWorker.cs` L3662-L3690). An advance costs `advances × R` bulbs, where R is 6 + 2 × level
//  for the human (never below 11 - advances, so the first few cost at least 11 a step) and 14 - level for the
//  computer players. From AD it costs twice as much, and everyone's R rises by up to 6 more when the leader is ahead of
//  schedule: the most advances anyone has, less one for every 9 turns played (`GameEngine.cs` L250-L256).
//
// see also: https://forums.civfanatics.com/threads/how-many-bulbs-need-for-the-current-tech.376195/#post-13810088
export const getRules: (
  gameDifficultyRegistry?: GameDifficultyRegistry,
  clientRegistry?: ClientRegistry,
  playerResearchRegistry?: PlayerResearchRegistry,
  turn?: Turn,
  year?: Year
) => Cost[] = (
  gameDifficultyRegistry: GameDifficultyRegistry = gameDifficultyRegistryInstance,
  clientRegistry: ClientRegistry = clientRegistryInstance,
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  turn: Turn = turnInstance,
  year: Year = yearInstance
): Cost[] => [
  new Cost(
    'civ1-science:research/cost/by-advances-known',
    new Effect(
      (CostAdvance: typeof Advance, playerResearch: PlayerResearch): number => {
        const level = levelOf(gameDifficultyRegistry),
          human = isHuman(playerResearch.player(), clientRegistry),
          advances = advancesKnown(playerResearch),
          ad = isAD(year),
          catchUp = ad
            ? Math.min(
                Math.max(
                  Math.max(
                    advances,
                    ...playerResearchRegistry
                      .entries()
                      .map((research) => advancesKnown(research))
                  ) - Math.floor(turn.value() / 9),
                  0
                ),
                6
              )
            : 0,
          ratio = (human ? 6 + 2 * level : 14 - level) + catchUp;

        return (
          advances *
          (human ? Math.max(ratio, 11 - advances) : ratio) *
          (ad ? 2 : 1)
        );
      }
    )
  ),
];

export default getRules;
