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
  TheRepublic,
  TheWheel,
  Writing,
} from '../../Advances';
import Advance from '@civ-clone/core-science/Advance';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Requirements from '@civ-clone/core-science/Rules/Requirements';

export const getRules: () => Requirements[] = (): Requirements[] => [
  ...([
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
  ] as [typeof Advance, ...typeof Advance[]][]).map(
    ([AdvanceWithRequirements, ...requiredAdvances]): Requirements =>
      new Requirements(
        new Criterion(
          (CheckAdvance: typeof Advance): boolean =>
            CheckAdvance === AdvanceWithRequirements
        ),
        new Effect(
          (
            CheckAdvance: typeof Advance,
            discoveredAdvances: Advance[]
          ): boolean =>
            requiredAdvances.every((RequiredAdvance: typeof Advance): boolean =>
              discoveredAdvances.some(
                (advance: Advance): boolean =>
                  advance instanceof RequiredAdvance
              )
            )
        )
      )
  ),
];

export default getRules;
