import {
  Alphabet,
  Astronomy,
  BronzeWorking,
  CeremonialBurial,
  Chivalry,
  CodeOfLaws,
  Construction,
  Currency,
  Engineering,
  Feudalism,
  Gunpowder,
  HorsebackRiding,
  Invention,
  IronWorking,
  Literacy,
  MapMaking,
  Masonry,
  Mathematics,
  Monarchy,
  Mysticism,
  Navigation,
  Pottery,
  TheWheel,
  Writing,
} from '../Advances';
import Advance from '@civ-clone/core-science/Advance';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { expect } from 'chai';
import requirements from '../Rules/Research/requirements';

describe('Advance', () => {
  const ruleRegistry = new RuleRegistry(),
    player = new Player(ruleRegistry),
    advanceRegistry = new AdvanceRegistry(),
    playerResearch = new PlayerResearch(player, advanceRegistry, ruleRegistry),
    noPrerequisites = [
      Alphabet,
      BronzeWorking,
      CeremonialBurial,
      HorsebackRiding,
      Masonry,
      Pottery,
      TheWheel,
    ];

  ruleRegistry.register(...requirements());

  advanceRegistry.register(
    ...[
      Alphabet,
      Astronomy,
      BronzeWorking,
      CeremonialBurial,
      Chivalry,
      CodeOfLaws,
      Construction,
      Currency,
      Engineering,
      Feudalism,
      Gunpowder,
      HorsebackRiding,
      Invention,
      IronWorking,
      Literacy,
      MapMaking,
      Masonry,
      Mathematics,
      Monarchy,
      Mysticism,
      Navigation,
      Pottery,
      TheWheel,
      Writing,
    ]
  );

  noPrerequisites.forEach((TestAdvance: typeof Advance): void => {
    it(`should be possible to discover ${TestAdvance.name} without any prerequisites being discovered`, (): void => {
      expect(playerResearch.available().includes(TestAdvance)).to.true;
    });
  });

  advanceRegistry
    .entries()
    .filter(
      (TestAdvance: typeof Advance): boolean =>
        !noPrerequisites.includes(TestAdvance)
    )
    .forEach((TestAdvance: typeof Advance): void => {
      it(`should not be possible to discover ${TestAdvance.name} without any prerequisites being discovered`, (): void => {
        expect(playerResearch.available().includes(TestAdvance)).to.false;
      });
    });
});
