import {
  Alphabet,
  BronzeWorking,
  CeremonialBurial,
  Masonry,
  Pottery,
  TheWheel,
} from '../Advances';
import { describe, it } from 'mocha';
import Advance from '@civ-clone/core-science/Advance';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import cost from '../Rules/Research/cost';
import { expect } from 'chai';

describe('cost', () => {
  it('should cost increasingly more for each `Advance`', () => {
    const ruleRegistry = new RuleRegistry(),
      advanceRegistry = new AdvanceRegistry(),
      playerResearch = new PlayerResearch(
        new Player(ruleRegistry),
        advanceRegistry,
        ruleRegistry
      );

    ruleRegistry.register(...cost());

    advanceRegistry.register(
      Alphabet,
      BronzeWorking,
      CeremonialBurial,
      Masonry,
      Pottery,
      TheWheel
    );

    (
      [
        [Alphabet, 6],
        [BronzeWorking, 12],
        [CeremonialBurial, 18],
        [Masonry, 24],
        [Pottery, 30],
        [TheWheel, 36],
      ] as [typeof Advance, number][]
    ).forEach(([AdvanceType, expectedCost]) => {
      if (playerResearch.researching() !== null) {
        playerResearch.add(playerResearch.cost());
      }

      playerResearch.research(AdvanceType);

      expect(playerResearch.cost().value()).equal(expectedCost);
    });
  });
});
