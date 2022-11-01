import { expect, spy, use } from 'chai';
import Engine from '@civ-clone/core-engine/Engine';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import complete from '../Rules/Research/complete';
import { describe } from 'mocha';
import started from '../Rules/Research/started';
import * as spies from 'chai-spies';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import { Alphabet } from '../Advances';
import Research from '@civ-clone/base-city-yield-research/Research';
import exp = require('constants');

use(spies);

describe('Research', () => {
  it('should trigger events on started and completed', () => {
    const ruleRegistry = new RuleRegistry(),
      advanceRegistry = new AdvanceRegistry(),
      playerResearch = new PlayerResearch(
        new Player(),
        advanceRegistry,
        ruleRegistry
      ),
      engine = new Engine();

    spy.on(engine, ['emit']);

    ruleRegistry.register(...started(engine), ...complete(engine));

    advanceRegistry.register(Alphabet);

    expect(engine.emit).not.called();

    playerResearch.research(Alphabet);
    playerResearch.cost().set(1);
    playerResearch.add(new Research(1));

    expect(engine.emit)
      .nth(1)
      .called.with.exactly('player:research', playerResearch, Alphabet);
    expect(engine.emit)
      .nth(2)
      .called.with.exactly(
        'player:research-complete',
        playerResearch,
        playerResearch.complete()[0]
      );
  });
});
