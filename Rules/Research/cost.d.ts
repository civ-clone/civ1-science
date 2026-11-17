import { ClientRegistry } from '@civ-clone/core-client/ClientRegistry';
import { GameDifficultyRegistry } from '@civ-clone/core-difficulty/GameDifficultyRegistry';
import { PlayerResearchRegistry } from '@civ-clone/core-science/PlayerResearchRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { Year } from '@civ-clone/core-game-year/Year';
import CatchUp from './CatchUp';
import Cost from '@civ-clone/core-science/Rules/Cost';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import RateMultiplier from './RateMultiplier';
export declare const advancesKnown: (playerResearch: PlayerResearch) => number;
export declare const isAD: (year: Year) => boolean;
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
export declare const catchUp: (
  { playerResearchRegistry, turn }: CostContext,
  playerResearch: PlayerResearch
) => number;
/** What `playerResearch`'s rate is multiplied by now: by the game's `RateMultiplier` rules, or doubled from AD. */
export declare const rateMultiplier: (
  { ruleRegistry, year }: CostContext,
  playerResearch: PlayerResearch
) => number;
/** Whether catch-up applies to `playerResearch` now: by the game's `CatchUp` rules, or from AD. */
export declare const catchUpApplies: (
  { ruleRegistry, year }: CostContext,
  playerResearch: PlayerResearch
) => boolean;
/**
 * What each step of an advance costs `playerResearch` now, in bulbs: R, with catch-up, doubled from AD (see below):
 * catch-up and the multiplier as the game's `CatchUp` and `RateMultiplier` rules say, when `context` has its rules.
 * `floor`: whether the human's R is held at 11 - advances for the first few, as v474.05's is. A cost that isn't a
 * number of advances times the rate (civ1-enhanced's tiers, civ-clone/web-renderer#1072) leaves it out.
 */
export declare const rate: (
  context: CostContext,
  playerResearch: PlayerResearch,
  floor?: boolean
) => number;
/**
 * What an advance costs `playerResearch` by v474.05's rule: the advances it knows, plus one, times the rate, to the
 * nearest whole bulb (a multiplier that isn't whole, civ-clone/web-renderer#1077, can make it a fraction).
 */
export declare const costByAdvancesKnown: (
  context: CostContext,
  playerResearch: PlayerResearch
) => number;
export declare const getRules: (
  gameDifficultyRegistry?: GameDifficultyRegistry,
  clientRegistry?: ClientRegistry,
  playerResearchRegistry?: PlayerResearchRegistry,
  turn?: Turn,
  year?: Year,
  ruleRegistry?: RuleRegistry
) => (Cost | RateMultiplier | CatchUp)[];
export default getRules;
