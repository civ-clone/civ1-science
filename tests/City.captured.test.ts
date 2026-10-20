import { describe, it } from 'mocha';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import { Alphabet, FutureTechnology } from '../Advances';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import PlayerResearchRegistry from '@civ-clone/core-science/PlayerResearchRegistry';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import captured from '../Rules/City/captured';
import setUpCity from '@civ-clone/civ1-city/tests/lib/setUpCity';
import { expect } from 'chai';
import { ClientRegistry } from '@civ-clone/core-client/ClientRegistry';
import Client from '@civ-clone/core-client/Client';

describe('City.captured', () => {
  it("should provide a random `Advance` that the capturing `Player` doesn't have", async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      playerResearchRegistry = new PlayerResearchRegistry(),
      advanceRegistry = new AdvanceRegistry(),
      clientRegistry = new ClientRegistry(),
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

    clientRegistry.register(new Client(enemyResearch.player()));

    ruleRegistry.register(
      ...captured(playerResearchRegistry, undefined, clientRegistry)
    );

    playerResearchRegistry.register(playerResearch, enemyResearch);

    advanceRegistry.register(Alphabet);

    playerResearch.addAdvance(Alphabet);

    expect(enemyResearch.completed(Alphabet)).false;

    city.capture(enemyResearch.player());

    // Wait for the async process to complete choosing an `Advance`.
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 10));

    expect(enemyResearch.completed(Alphabet)).true;
  });

  it('should not take a Future Technology', async (): Promise<void> => {
    const ruleRegistry = new RuleRegistry(),
      playerResearchRegistry = new PlayerResearchRegistry(),
      advanceRegistry = new AdvanceRegistry(),
      clientRegistry = new ClientRegistry(),
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
      ),
      client = new Client(enemyResearch.player());
    let asked = false;

    client.chooseFromList = async (meta: any): Promise<any> => {
      asked = true;

      return meta.choices()[0].value();
    };

    clientRegistry.register(client);

    ruleRegistry.register(
      ...captured(playerResearchRegistry, undefined, clientRegistry)
    );

    playerResearchRegistry.register(playerResearch, enemyResearch);

    advanceRegistry.register(Alphabet, FutureTechnology);

    playerResearch.addAdvance(Alphabet);
    playerResearch.addAdvance(FutureTechnology);
    enemyResearch.addAdvance(Alphabet);

    city.capture(enemyResearch.player());

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 10));

    expect(asked).false;
    expect(enemyResearch.completed(FutureTechnology)).false;
  });
});
