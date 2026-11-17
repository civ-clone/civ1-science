import {
  Alphabet,
  BronzeWorking,
  CeremonialBurial,
  FutureTechnology,
  Masonry,
  Pottery,
  TheWheel,
} from '../Advances';
import {
  Chieftain,
  Emperor,
  King,
  Prince,
  Warlord,
} from '@civ-clone/civ1-difficulty/Difficulties';
import { describe, it } from 'mocha';
import AIClient from '@civ-clone/core-ai-client/AIClient';
import Advance from '@civ-clone/core-science/Advance';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import Client from '@civ-clone/core-client/Client';
import ClientRegistry from '@civ-clone/core-client/ClientRegistry';
import GameDifficultyRegistry from '@civ-clone/core-difficulty/GameDifficultyRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import PlayerResearchRegistry from '@civ-clone/core-science/PlayerResearchRegistry';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Turn from '@civ-clone/core-turn-based-game/Turn';
import TurnStart from '@civ-clone/core-player/Rules/TurnStart';
import Effect from '@civ-clone/core-rule/Effect';
import High from '@civ-clone/core-rule/Priorities/High';
import Research from '@civ-clone/core-science/Yields/Research';
import Year from '@civ-clone/core-game-year/Year';
import CatchUp from '../Rules/Research/CatchUp';
import RateMultiplier from '../Rules/Research/RateMultiplier';
import cost from '../Rules/Research/cost';
import { expect } from 'chai';
import turnStart from '../Rules/Player/turn-start';

type Setting = {
  Level?: typeof Prince;
  human?: boolean;
  known?: number;
  // Another player, and the advances it has already discovered.
  leader?: number;
  year?: number | (() => number);
  turn?: number;
  // The cost asks the game's rules for its multiplier and catch-up (civ-clone/web-renderer#1077), and these take the
  //  place of v474.05's.
  withRules?: boolean;
  multiplier?: number;
  catchUp?: boolean;
};

const setUp = ({
  Level = Prince,
  human = true,
  known = 4,
  leader,
  year = -4000,
  turn = 0,
  withRules = false,
  multiplier,
  catchUp,
}: Setting = {}) => {
  const ruleRegistry = new RuleRegistry(),
    advanceRegistry = new AdvanceRegistry(),
    clientRegistry = new ClientRegistry(),
    gameDifficultyRegistry = new GameDifficultyRegistry(),
    playerResearchRegistry = new PlayerResearchRegistry(),
    player = new Player(ruleRegistry),
    playerResearch = new PlayerResearch(player, advanceRegistry, ruleRegistry),
    gameYear = {
      value: typeof year === 'function' ? year : () => year,
    } as unknown as Year,
    gameTurn = { value: () => turn } as unknown as Turn;

  gameDifficultyRegistry.set(Level);
  clientRegistry.register(human ? new Client(player) : new AIClient(player));
  playerResearchRegistry.register(playerResearch);
  ruleRegistry.register(
    ...cost(
      gameDifficultyRegistry,
      clientRegistry,
      playerResearchRegistry,
      gameTurn,
      gameYear,
      withRules ? ruleRegistry : undefined
    ),
    ...turnStart(playerResearchRegistry, ruleRegistry)
  );

  // Before v474.05's, as a set's would be by taking their place.
  if (multiplier !== undefined) {
    ruleRegistry.register(
      new RateMultiplier(new High(), new Effect((): number => multiplier))
    );
  }

  if (catchUp !== undefined) {
    ruleRegistry.register(
      new CatchUp(new High(), new Effect((): boolean => catchUp))
    );
  }
  advanceRegistry.register(
    Alphabet,
    BronzeWorking,
    CeremonialBurial,
    Masonry,
    Pottery,
    TheWheel
  );

  // `known` advances already discovered, so the next is advance `known + 1`.
  (
    [Alphabet, BronzeWorking, CeremonialBurial, Masonry, Pottery].slice(
      0,
      known
    ) as (typeof Advance)[]
  ).forEach((Known) => playerResearch.complete().push(new Known()));

  if (leader !== undefined) {
    const leaderResearch = new PlayerResearch(
      new Player(ruleRegistry),
      advanceRegistry,
      ruleRegistry
    );

    // Only how many is counted.
    for (let i = 0; i < leader; i++) {
      leaderResearch.complete().push(new Alphabet());
    }

    playerResearchRegistry.register(leaderResearch);
  }

  return { player, playerResearch, ruleRegistry };
};

const costOf = (setting: Setting): number => {
  const { playerResearch } = setUp(setting);

  playerResearch.research(TheWheel);

  return playerResearch.cost().value();
};

describe('cost', () => {
  const levels = [Chieftain, Warlord, Prince, King, Emperor];

  it('should cost the human 30 to 70 for a fifth advance in BC, Chieftain to Emperor', () => {
    expect(levels.map((Level) => costOf({ Level }))).eql([30, 40, 50, 60, 70]);
  });

  it('should cost twice as much in AD', () => {
    expect(levels.map((Level) => costOf({ Level, year: 1, turn: 200 }))).eql([
      60, 80, 100, 120, 140,
    ]);
  });

  it('should cost the human at least 11 a step for the first few advances', () => {
    expect(
      [0, 1, 2, 3].map((known) => costOf({ Level: Chieftain, known }))
    ).eql([10, 18, 24, 28]);
  });

  it('should cost a computer player 14 - level a step', () => {
    expect(levels.map((Level) => costOf({ Level, human: false }))).eql([
      70, 65, 60, 55, 50,
    ]);
  });

  it('should cost more in AD while the leader is ahead of schedule', () => {
    // 5 advances by turn 9: 5 - 1 = 4 more a step, doubled in AD.
    expect(costOf({ Level: Prince, year: 1, turn: 9 })).equal((10 + 4) * 5 * 2);
    expect(costOf({ Level: Prince, year: 1, turn: 0 })).equal((10 + 5) * 5 * 2);
    // Not in BC.
    expect(costOf({ Level: Prince, year: -1, turn: 0 })).equal(10 * 5);
  });

  it("should measure the schedule by the leader's advances, not the player's own", () => {
    // The leader has 8 by turn 27: 8 - 3 = 5 more a step. By the player's own 5 it would be 5 - 3 = 2.
    expect(costOf({ Level: Prince, year: 1, turn: 27, leader: 7 })).equal(
      (10 + 5) * 5 * 2
    );
    // A player behind them doesn't count.
    expect(costOf({ Level: Prince, year: 1, turn: 27, leader: 2 })).equal(
      (10 + 2) * 5 * 2
    );
    // Never more than 6: the leader has 13 by turn 0.
    expect(costOf({ Level: Prince, year: 1, turn: 0, leader: 12 })).equal(
      (10 + 6) * 5 * 2
    );
  });
});

describe('player:turn-start', () => {
  it('should work out the cost of the advance being researched again', () => {
    let year = -1;

    const { player, playerResearch, ruleRegistry } = setUp({
      year: () => year,
      turn: 200,
    });

    playerResearch.research(TheWheel);

    expect(playerResearch.cost().value()).equal(50);

    year = 1;

    ruleRegistry.process(TurnStart, player);

    expect(playerResearch.cost().value()).equal(100);
  });

  // As `civ1-player` adds the cities' research, at `High` (Copilot on #2).
  it("should work out the cost before the turn's research is added", () => {
    let year = -1;

    const { player, playerResearch, ruleRegistry } = setUp({
      year: () => year,
      turn: 200,
    });

    ruleRegistry.register(
      new TurnStart(
        new High(),
        new Effect((): void => playerResearch.add(new Research(60)))
      )
    );

    playerResearch.research(TheWheel);

    // 50 in BC, 100 in AD: 60 is enough for the one and not the other.
    year = 1;

    ruleRegistry.process(TurnStart, player);

    expect(playerResearch.researching()).equal(TheWheel);
    expect(playerResearch.cost().value()).equal(100);
    expect(playerResearch.progress().value()).equal(60);
  });

  it('should count each Future Technology as an advance known, and cost more for the next', () => {
    const { playerResearch } = setUp({ known: 4 });

    playerResearch.research(FutureTechnology);

    const first = playerResearch.cost().value();

    playerResearch.add(new Research(first));

    expect(playerResearch.completed(FutureTechnology)).true;
    expect(playerResearch.researching()).null;

    playerResearch.research(FutureTechnology);

    expect(first).equal(costOf({ known: 4 }));
    expect(playerResearch.cost().value()).equal(costOf({ known: 5 }));
  });

  describe("with the game's rules (civ-clone/web-renderer#1077)", () => {
    it("should fall back to v474.05's when no rule of either kind is in force", () => {
      const { playerResearch, ruleRegistry } = setUp({
        withRules: true,
        year: 1,
        turn: 900,
      });

      [
        ...ruleRegistry.get(RateMultiplier),
        ...ruleRegistry.get(CatchUp),
      ].forEach((rule) => rule.disable());
      playerResearch.research(TheWheel);

      // 5 × 10 × 2, as without the rules.
      expect(playerResearch.cost().value()).equal(100);
    });

    it("should cost what it did, by v474.05's own multiplier and catch-up rules", () => {
      [
        {},
        { year: 1, turn: 200 },
        { year: 1, turn: 18, leader: 10 },
        { Level: Chieftain, known: 1 },
        { human: false, year: 1, turn: 0, leader: 8 },
      ].forEach((setting: Setting) =>
        expect(
          costOf({ ...setting, withRules: true }),
          JSON.stringify(setting)
        ).equal(costOf(setting))
      );
    });

    it("should multiply the rate by what a rule taking v474.05's place says, rounding the cost", () => {
      // The fifth advance at Prince: 5 × 10 a step, × 0.65 = 32.5, to 33; in AD (without catch-up), not doubled.
      expect(costOf({ withRules: true, multiplier: 0.65 })).equal(33);
      expect(
        costOf({ withRules: true, multiplier: 3, catchUp: false, year: 1 })
      ).equal(150);
    });

    it("should hold the human's floor before the multiplier, as before the doubling", () => {
      // Chieftain, nothing known: max(6, 11 - 1) = 10 a step, × 0.5 = 5.
      expect(
        costOf({ withRules: true, multiplier: 0.5, Level: Chieftain, known: 0 })
      ).equal(5);
    });

    it('should add catch-up whenever a rule says so, in BC too, and none when one says not', () => {
      // The leader has 11, plus one: 12 - 18 / 9 = 10, held at 6. Prince, BC: 5 × (10 + 6) = 80.
      expect(
        costOf({ withRules: true, catchUp: true, turn: 18, leader: 11 })
      ).equal(80);
      // In AD with catch-up off: 5 × 10 × 2 = 100.
      expect(
        costOf({
          withRules: true,
          catchUp: false,
          year: 1,
          turn: 18,
          leader: 11,
        })
      ).equal(100);
    });
  });
});
