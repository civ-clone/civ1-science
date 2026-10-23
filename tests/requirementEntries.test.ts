import * as Advances from '../Advances';
import {
  Explosives,
  Gunpowder,
  Invention,
  IronWorking,
  Metallurgy,
} from '../Advances';
import { Game } from '@civ-clone/core-game/Game';
import Player from '@civ-clone/core-player/Player';
import PlayerResearch from '@civ-clone/core-science/PlayerResearch';
import { Requirement } from '@civ-clone/core-requirement/Requirement';
import Requirements from '@civ-clone/core-science/Rules/Requirements';
import Rule from '@civ-clone/core-rule/Rule';
import { expect } from 'chai';
import getRules from '../Rules/Research/requirements';
import register from '../registerRules';
import requiresAdvances from '../Requirements';

// Through `register(game)`, as a game gets them: the entries in `game.requirements`, and the rules made from them in
//  `game.rules` under the same ids (civ-clone/web-renderer#37).
const setUp = () => {
  const game = new Game();

  game.advances.register(...Object.values(Advances));
  register(game);

  const player = new Player(game.rules),
    research = new PlayerResearch(player, game.advances, game.rules);

  return { game, research };
};

const ids = (rules: Rule[]): (string | null)[] =>
  rules.map((rule: Rule): string | null => rule.id());

describe('civ1-science requirements', (): void => {
  it('should make one research rule for each entry, under its id', (): void => {
    const { game } = setUp();

    expect(requiresAdvances.length).equal(60);

    requiresAdvances.forEach((entry: Requirement): void => {
      const rules = game.requirements.rulesFor(entry.id);

      expect(rules, entry.id).length(1);
      expect(rules[0], entry.id).instanceOf(Requirements);
      expect(game.rules.getById(entry.id), entry.id).equal(rules[0]);
    });
  });

  it('should have an entry for every research rule but Future Technology, in the order they always were', (): void => {
    const { game } = setUp();

    expect(ids(game.rules.get(Requirements))).eql(ids(getRules()));
    // Written out as they were registered before they were made from entries, so a reordered table fails here.
    expect(ids(getRules())).eql([
      'civ1-science:research/requirements/AdvancedFlight',
      'civ1-science:research/requirements/Astronomy',
      'civ1-science:research/requirements/AtomicTheory',
      'civ1-science:research/requirements/Automobile',
      'civ1-science:research/requirements/Banking',
      'civ1-science:research/requirements/BridgeBuilding',
      'civ1-science:research/requirements/Chemistry',
      'civ1-science:research/requirements/Chivalry',
      'civ1-science:research/requirements/CodeOfLaws',
      'civ1-science:research/requirements/Combustion',
      'civ1-science:research/requirements/Communism',
      'civ1-science:research/requirements/Computers',
      'civ1-science:research/requirements/Conscription',
      'civ1-science:research/requirements/Construction',
      'civ1-science:research/requirements/Corporation',
      'civ1-science:research/requirements/Currency',
      'civ1-science:research/requirements/Democracy',
      'civ1-science:research/requirements/Electricity',
      'civ1-science:research/requirements/Electronics',
      'civ1-science:research/requirements/Engineering',
      'civ1-science:research/requirements/Explosives',
      'civ1-science:research/requirements/Feudalism',
      'civ1-science:research/requirements/Flight',
      'civ1-science:research/requirements/FusionPower',
      'civ1-science:research/requirements/GeneticEngineering',
      'civ1-science:research/requirements/Gunpowder',
      'civ1-science:research/requirements/Industrialization',
      'civ1-science:research/requirements/Invention',
      'civ1-science:research/requirements/IronWorking',
      'civ1-science:research/requirements/LaborUnion',
      'civ1-science:research/requirements/Literacy',
      'civ1-science:research/requirements/Magnetism',
      'civ1-science:research/requirements/MapMaking',
      'civ1-science:research/requirements/MassProduction',
      'civ1-science:research/requirements/Mathematics',
      'civ1-science:research/requirements/Medicine',
      'civ1-science:research/requirements/Metallurgy',
      'civ1-science:research/requirements/Monarchy',
      'civ1-science:research/requirements/Mysticism',
      'civ1-science:research/requirements/Navigation',
      'civ1-science:research/requirements/NuclearFission',
      'civ1-science:research/requirements/NuclearPower',
      'civ1-science:research/requirements/Philosophy',
      'civ1-science:research/requirements/Physics',
      'civ1-science:research/requirements/Plastics',
      'civ1-science:research/requirements/Railroad',
      'civ1-science:research/requirements/Recycling',
      'civ1-science:research/requirements/Refining',
      'civ1-science:research/requirements/Religion',
      'civ1-science:research/requirements/Robotics',
      'civ1-science:research/requirements/Rocketry',
      'civ1-science:research/requirements/SpaceFlight',
      'civ1-science:research/requirements/SteamEngine',
      'civ1-science:research/requirements/Steel',
      'civ1-science:research/requirements/Superconductor',
      'civ1-science:research/requirements/TheRepublic',
      'civ1-science:research/requirements/TheoryOfGravity',
      'civ1-science:research/requirements/Trade',
      'civ1-science:research/requirements/University',
      'civ1-science:research/requirements/Writing',
      'civ1-science:research/requirements/FutureTechnology',
    ]);
  });

  it('should read the graph both ways', (): void => {
    const { game } = setUp();

    expect(
      game.requirements
        .for(Gunpowder)
        .map((entry: Requirement) => entry.targets)
    ).eql([[Invention, IronWorking]]);
    expect(
      game.requirements
        .leadsTo(Gunpowder)
        .map((entry: Requirement) => entry.subject)
    ).eql([Explosives, Metallurgy]);
  });

  it('should be researchable as the entries say, and as a plugin changes them', (): void => {
    const { game, research } = setUp(),
      canResearch = (): boolean => research.available().includes(Gunpowder);

    research.addAdvance(Invention);

    expect(canResearch()).false;

    research.addAdvance(IronWorking);

    expect(canResearch()).true;

    game.requirements.replace(
      'civ1-science:research/requirements/Gunpowder',
      new Requirement({
        id: 'civ1-science:research/requirements/Gunpowder',
        subject: Gunpowder,
        relation: 'requires',
        targets: [Invention, IronWorking, Explosives],
      })
    );

    expect(canResearch()).false;
  });
});
