import { Alphabet, BronzeWorking, CeremonialBurial } from '../Advances';
import { describe, it } from 'mocha';
import AdvanceRegistry from '@civ-clone/core-science/AdvanceRegistry';
import { ChooseResearch } from '../PlayerActions';
import Player from '@civ-clone/core-player/Player';
import PlayerResearchRegistry from '@civ-clone/core-science/PlayerResearchRegistry';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import action from '../Rules/Player/action';
import added from '../Rules/Player/added';
import { expect } from 'chai';

describe('Player.action', () => {
  it('should provide a `ChooseResearch` `PlayerAction` when the `PlayerResearch` is not researching', () => {
    const ruleRegistry = new RuleRegistry(),
      playerResearchRegistry = new PlayerResearchRegistry(),
      advanceRegistry = new AdvanceRegistry();

    ruleRegistry.register(
      ...action(playerResearchRegistry),
      ...added(advanceRegistry, playerResearchRegistry, ruleRegistry, () => 0.5)
    );

    advanceRegistry.register(Alphabet, BronzeWorking);

    const player = new Player(ruleRegistry),
      playerResearch = playerResearchRegistry.getByPlayer(player);

    // we should be granted some techs on `Added`
    expect(playerResearch.complete()).length(2);

    playerResearchRegistry.register(playerResearch);

    expect(playerResearch.player().actions()).length(0);

    advanceRegistry.register(CeremonialBurial);

    expect(playerResearch.player().mandatoryActions()).length(1);
    expect(playerResearch.player().action()).instanceof(ChooseResearch);

    playerResearch.research(playerResearch.available()[0]);

    expect(playerResearch.player().mandatoryActions()).length(0);
  });
});
