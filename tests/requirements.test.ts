import {
  Alphabet,
  Astronomy,
  BridgeBuilding,
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
  TheRepublic,
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

describe('requirements', () => {
  const ruleRegistry = new RuleRegistry(),
    player = new Player(ruleRegistry),
    advanceRegistry = new AdvanceRegistry();

  ruleRegistry.register(...requirements());

  advanceRegistry.register(
    ...[
      Alphabet,
      Astronomy,
      BronzeWorking,
      BridgeBuilding,
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
      TheRepublic,
      Writing,
    ]
  );

  (
    [
      Alphabet,
      BronzeWorking,
      CeremonialBurial,
      HorsebackRiding,
      Masonry,
      Pottery,
      TheWheel,
    ] as typeof Advance[]
  ).forEach((TestAdvance: typeof Advance): void => {
    it(`should be possible to discover ${TestAdvance.name} without any prerequisites being discovered`, (): void => {
      const playerResearch = new PlayerResearch(
        player,
        advanceRegistry,
        ruleRegistry
      );

      expect(playerResearch.available().includes(TestAdvance)).to.true;
    });
  });

  (
    [
      [Astronomy, Mathematics, Mysticism],
      [BridgeBuilding, Construction, IronWorking],
      [Chivalry, Feudalism, HorsebackRiding],
      [CodeOfLaws, Alphabet],
      [Construction, Currency, Masonry],
      [Currency, BronzeWorking],
      [Engineering, Construction, TheWheel],
      [Feudalism, Masonry, Monarchy],
      [Gunpowder, Invention, IronWorking],
      [Invention, Engineering, Literacy],
      [IronWorking, BronzeWorking],
      [Literacy, CodeOfLaws, Writing],
      [MapMaking, Alphabet],
      [Mathematics, Alphabet, Masonry],
      [Monarchy, CodeOfLaws, Mysticism],
      [Mysticism, CeremonialBurial],
      [Navigation, Astronomy, MapMaking],
      [TheRepublic, CodeOfLaws, Literacy],
      [Writing, Alphabet],
    ] as typeof Advance[][]
  ).forEach(([TestAdvance, ...Requirements]: typeof Advance[]): void => {
    it(`should only be possible to discover ${TestAdvance.name} once prerequisites have been discovered`, (): void => {
      const playerResearch = new PlayerResearch(
        player,
        advanceRegistry,
        ruleRegistry
      );

      expect(playerResearch.available().includes(TestAdvance)).to.false;

      Requirements.forEach((Requirement: typeof Advance) =>
        playerResearch.addAdvance(Requirement)
      );

      expect(playerResearch.available().includes(TestAdvance)).to.true;
    });
  });
});
