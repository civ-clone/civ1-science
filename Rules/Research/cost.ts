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
import { CATCH_UP_RULE, COST_RULE, RATE_MULTIPLIER_RULE } from '../../RuleIds';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { Year, instance as yearInstance } from '@civ-clone/core-game-year/Year';
import Advance from '@civ-clone/core-science/Advance';
import CatchUp from './CatchUp';
import Cost from '@civ-clone/core-science/Rules/Cost';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import RateMultiplier from './RateMultiplier';
import isHuman from '@civ-clone/civ1-difficulty/isHuman';
import { levelOf } from '@civ-clone/civ1-difficulty/level';

// Advances count from 1, without the free Mining, Irrigation and Roads, as v474.05 counts them.
export const advancesKnown = (playerResearch: PlayerResearch): number =>
  playerResearch.complete().length + 1;

export const isAD = (year: Year): boolean => {
  try {
    return year.value() >= 0;
  } catch (e) {
    // A game with no `YearRule` has no year: count it as BC.
    return false;
  }
};

/** What the rate of research costs is read from: the game's difficulty, its players' clients and research, and when. */
export interface CostContext {
  gameDifficultyRegistry: GameDifficultyRegistry;
  clientRegistry: ClientRegistry;
  playerResearchRegistry: PlayerResearchRegistry;
  turn: Turn;
  year: Year;
  /**
   * The game's rules, for its `RateMultiplier` and `CatchUp` rules (civ-clone/web-renderer#1077). Without them, the
   * rate is v474.05's: doubled, and with catch-up, from AD.
   */
  ruleRegistry?: RuleRegistry;
}

/**
 * How much the rate rises by when the leader is ahead of schedule, up to 6: the most advances anyone has, less one for
 * every 9 turns played (`GameEngine.cs` L250-L256), whether or not it applies to `playerResearch` now.
 */
export const catchUp = (
  { playerResearchRegistry, turn }: CostContext,
  playerResearch: PlayerResearch
): number =>
  Math.min(
    Math.max(
      Math.max(
        advancesKnown(playerResearch),
        ...playerResearchRegistry
          .entries()
          .map((research) => advancesKnown(research))
      ) - Math.floor(turn.value() / 9),
      0
    ),
    6
  );

/** What `playerResearch`'s rate is multiplied by now: by the game's `RateMultiplier` rules, or doubled from AD. */
export const rateMultiplier = (
  { ruleRegistry, year }: CostContext,
  playerResearch: PlayerResearch
): number => {
  if (ruleRegistry === undefined) {
    return isAD(year) ? 2 : 1;
  }

  const [multiplier] = ruleRegistry.process(RateMultiplier, playerResearch);

  return multiplier ?? 1;
};

/** Whether catch-up applies to `playerResearch` now: by the game's `CatchUp` rules, or from AD. */
export const catchUpApplies = (
  { ruleRegistry, year }: CostContext,
  playerResearch: PlayerResearch
): boolean => {
  if (ruleRegistry === undefined) {
    return isAD(year);
  }

  const [applies] = ruleRegistry.process(CatchUp, playerResearch);

  return applies ?? false;
};

/**
 * What each step of an advance costs `playerResearch` now, in bulbs: R, with catch-up, doubled from AD (see below):
 * catch-up and the multiplier as the game's `CatchUp` and `RateMultiplier` rules say, when `context` has its rules.
 * `floor`: whether the human's R is held at 11 - advances for the first few, as v474.05's is. A cost that isn't a
 * number of advances times the rate (civ1-enhanced's tiers, civ-clone/web-renderer#1072) leaves it out.
 */
export const rate = (
  context: CostContext,
  playerResearch: PlayerResearch,
  floor: boolean = true
): number => {
  const level = levelOf(context.gameDifficultyRegistry),
    human = isHuman(playerResearch.player(), context.clientRegistry),
    advances = advancesKnown(playerResearch),
    ratio =
      (human ? 6 + 2 * level : 14 - level) +
      (catchUpApplies(context, playerResearch)
        ? catchUp(context, playerResearch)
        : 0);

  return (
    (human && floor ? Math.max(ratio, 11 - advances) : ratio) *
    rateMultiplier(context, playerResearch)
  );
};

/**
 * What an advance costs `playerResearch` by v474.05's rule: the advances it knows, plus one, times the rate, to the
 * nearest whole bulb (a multiplier that isn't whole, civ-clone/web-renderer#1077, can make it a fraction).
 */
export const costByAdvancesKnown = (
  context: CostContext,
  playerResearch: PlayerResearch
): number =>
  Math.round(advancesKnown(playerResearch) * rate(context, playerResearch));

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
  year?: Year,
  ruleRegistry?: RuleRegistry
) => (Cost | RateMultiplier | CatchUp)[] = (
  gameDifficultyRegistry: GameDifficultyRegistry = gameDifficultyRegistryInstance,
  clientRegistry: ClientRegistry = clientRegistryInstance,
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance,
  turn: Turn = turnInstance,
  year: Year = yearInstance,
  // The rules the cost asks for its multiplier and catch-up. Left out, the cost is v474.05's whatever rules there
  //  are, as before they were rules of their own.
  ruleRegistry?: RuleRegistry
): (Cost | RateMultiplier | CatchUp)[] => [
  new Cost(
    COST_RULE,
    new Effect(
      (CostAdvance: typeof Advance, playerResearch: PlayerResearch): number =>
        costByAdvancesKnown(
          {
            gameDifficultyRegistry,
            clientRegistry,
            playerResearchRegistry,
            turn,
            year,
            ruleRegistry,
          },
          playerResearch
        )
    )
  ),
  // Each a rule of its own, so a set can take the place of either (civ-clone/web-renderer#1077).
  new RateMultiplier(
    RATE_MULTIPLIER_RULE,
    new Effect((): number => (isAD(year) ? 2 : 1))
  ),
  new CatchUp(CATCH_UP_RULE, new Effect((): boolean => isAD(year))),
];

export default getRules;
