import { describe, it } from 'mocha';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import { Alphabet } from '../Advances';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import PlayerResearchRegistry from '@civ-clone/core-science/PlayerResearchRegistry';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import captured from '../Rules/City/captured';
import setUpCity from '@civ-clone/civ1-city/tests/lib/setUpCity';
import { expect } from 'chai';

describe('City.captured', () => {
  it("should provide a random `Advance` that the capturing `Player` doesn't have", async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      playerResearchRegistry = new PlayerResearchRegistry(),
      advanceRegistry = new AdvanceRegistry(),
      city = await setUpCity({
        ruleRegistry,
      }),
      playerResearch = new PlayerResearch(
        city.player(),
        advanceRegistry,
        ruleRegistry
      ),
      enemyResearch = new PlayerResearch(
        new Player(ruleRegistry),
        advanceRegistry,
        ruleRegistry
      );

    ruleRegistry.register(...captured(playerResearchRegistry));

    playerResearchRegistry.register(playerResearch, enemyResearch);

    advanceRegistry.register(Alphabet);

    playerResearch.addAdvance(Alphabet);

    expect(enemyResearch.completed(Alphabet)).false;

    city.capture(enemyResearch.player());

    expect(enemyResearch.completed(Alphabet)).true;
  });
});
