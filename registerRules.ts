import action from './Rules/Player/action';
import added from './Rules/Player/added';
import captured from './Rules/City/captured';
import complete from './Rules/Research/complete';
import cost from './Rules/Research/cost';
import processYield from './Rules/City/process-yield';
import {
  deriveRequirementsRules,
  futureTechnology,
} from './Rules/Research/requirements';
import requiresAdvances from './Requirements';
import started from './Rules/Research/started';
import turnStart from './Rules/Player/turn-start';
import { Game, defaultGame } from '@civ-clone/core-game';

export const register = (game: Game): void => {
  game.rules.register(
    ...action(game.playerResearch),
    ...added(game.advances, game.playerResearch, game.rules, game.rng),
    ...captured(game.playerResearch, game.rng, game.clients),
    ...complete(game.engine),
    ...cost(
      game.difficulty,
      game.clients,
      game.playerResearch,
      game.turn,
      game.year
    ),
    ...processYield(game.playerResearch, game.rules, game.playerGovernments)
  );

  // Which advances a player can research, from the entries in `Requirements`: their rules land where the research
  //  rules always were, so nothing else moves in the order rules run (civ-clone/web-renderer#37).
  game.requirements.add(deriveRequirementsRules, ...requiresAdvances);

  game.rules.register(
    futureTechnology(game.advances),
    ...started(game.engine),
    ...turnStart(game.playerResearch, game.rules)
  );
};

// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
register(defaultGame);

export default register;
