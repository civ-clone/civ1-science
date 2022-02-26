import {
  AdvancedFlight,
  Alphabet,
  Astronomy,
  AtomicTheory,
  Automobile,
  Banking,
  BridgeBuilding,
  BronzeWorking,
  CeremonialBurial,
  Chemistry,
  Chivalry,
  CodeOfLaws,
  Combustion,
  Communism,
  Computers,
  Conscription,
  Construction,
  Corporation,
  Currency,
  Democracy,
  Electricity,
  Electronics,
  Engineering,
  Explosives,
  Feudalism,
  Flight,
  FusionPower,
  GeneticEngineering,
  Gunpowder,
  HorsebackRiding,
  Industrialization,
  Invention,
  IronWorking,
  LaborUnion,
  Literacy,
  Magnetism,
  MapMaking,
  Masonry,
  MassProduction,
  Mathematics,
  Medicine,
  Metallurgy,
  Monarchy,
  Mysticism,
  Navigation,
  NuclearFission,
  NuclearPower,
  Philosophy,
  Physics,
  Plastics,
  Railroad,
  Recycling,
  Refining,
  Religion,
  Robotics,
  Rocketry,
  SpaceFlight,
  SteamEngine,
  Steel,
  Superconductor,
  TheRepublic,
  TheWheel,
  TheoryOfGravity,
  Trade,
  University,
  Writing,
} from '../../Advances';
import Advance from '@civ-clone/core-science/Advance';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Requirements from '@civ-clone/core-science/Rules/Requirements';

export const getRules: () => Requirements[] = (): Requirements[] => [
  ...(
    [
      [AdvancedFlight, Flight, Electricity],
      [Astronomy, Mathematics, Mysticism],
      [AtomicTheory, TheoryOfGravity, Physics],
      [Automobile, Combustion, Steel],
      [Banking, TheRepublic, Trade],
      [BridgeBuilding, Construction, IronWorking],
      [Chemistry, University, Medicine],
      [Chivalry, Feudalism, HorsebackRiding],
      [CodeOfLaws, Alphabet],
      [Combustion, Refining, Explosives],
      [Communism, Philosophy, Industrialization],
      [Computers, Electronics, Mathematics],
      [Conscription, Explosives, TheRepublic],
      [Construction, Currency, Masonry],
      [Corporation, Banking, Industrialization],
      [Currency, BronzeWorking],
      [Democracy, Philosophy, Literacy],
      [Electricity, Metallurgy, Magnetism],
      [Electronics, Engineering, Electricity],
      [Engineering, Construction, TheWheel],
      [Explosives, Gunpowder, Chemistry],
      [Feudalism, Masonry, Monarchy],
      [Flight, Combustion, Physics],
      [FusionPower, NuclearPower, Superconductor],
      [GeneticEngineering, Corporation, Medicine],
      [Gunpowder, Invention, IronWorking],
      [Industrialization, Railroad, Banking],
      [Invention, Engineering, Literacy],
      [IronWorking, BronzeWorking],
      [LaborUnion, MassProduction, Communism],
      [Literacy, CodeOfLaws, Writing],
      [Magnetism, Navigation, Physics],
      [MapMaking, Alphabet],
      [MassProduction, Corporation, Automobile],
      [Mathematics, Alphabet, Masonry],
      [Medicine, Philosophy, Trade],
      [Metallurgy, Gunpowder, University],
      [Monarchy, CodeOfLaws, Mysticism],
      [Mysticism, CeremonialBurial],
      [Navigation, Astronomy, MapMaking],
      [NuclearFission, MassProduction, AtomicTheory],
      [NuclearPower, NuclearFission, Electronics],
      [Philosophy, Mysticism, Literacy],
      [Physics, Navigation, Mathematics],
      [Plastics, Refining, SpaceFlight],
      [Railroad, BridgeBuilding, SteamEngine],
      [Recycling, Democracy, MassProduction],
      [Refining, Corporation, Chemistry],
      [Religion, Philosophy, Writing],
      [Robotics, Computers, Plastics],
      [Rocketry, Electronics, AdvancedFlight],
      [SpaceFlight, Computers, Rocketry],
      [SteamEngine, Invention, Physics],
      [Steel, Metallurgy, Industrialization],
      [Superconductor, MassProduction, Plastics],
      [TheRepublic, CodeOfLaws, Literacy],
      [TheoryOfGravity, Astronomy, University],
      [Trade, CodeOfLaws, Currency],
      [University, Philosophy, Mathematics],
      [Writing, Alphabet],
    ] as [typeof Advance, ...typeof Advance[]][]
  ).map(
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
