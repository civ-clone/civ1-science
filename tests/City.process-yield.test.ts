import { describe, it } from 'mocha';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import Effect from '@civ-clone/core-rule/Effect';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import PlayerResearchRegistry from '@civ-clone/core-science/PlayerResearchRegistry';
import ProcessYield from '@civ-clone/core-city/Rules/ProcessYield';
import { Research } from '../Yields';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Yield from '@civ-clone/core-city/Rules/Yield';
import { expect } from 'chai';
import processYield from '../Rules/City/process-yield';
import { reduceYield } from '@civ-clone/core-yield/lib/reduceYields';
import setUpCity from '@civ-clone/civ1-city/tests/lib/setUpCity';

describe('City.process-yield', () => {
  it('should add `Research` to the `PlayerResearch` on `ProcessYield`', async (): Promise<void> => {
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
      );

    ruleRegistry.register(
      new Yield(new Effect(() => new Research(1))),
      ...processYield(playerResearchRegistry, ruleRegistry)
    );

    playerResearchRegistry.register(playerResearch);

    expect(playerResearch.progress().value()).equal(0);

    const researchYield = reduceYield(city.yields(), Research);

    ruleRegistry.process(
      ProcessYield,
      new Research(researchYield),
      city,
      city.yields()
    );

    expect(playerResearch.progress().value()).equal(1);
  });
});
