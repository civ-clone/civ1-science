import action from './Rules/Player/action';
import added from './Rules/Player/added';
import captured from './Rules/City/captured';
import complete from './Rules/Research/complete';
import cost from './Rules/Research/cost';
import processYield from './Rules/City/process-yield';
import requirements from './Rules/Research/requirements';
import started from './Rules/Research/started';
import { Game, defaultGame } from '@civ-clone/core-game';

export const register = (game: Game): void =>
  game.rules.register(
    ...action(game.playerResearch),
    ...added(game.advances, game.playerResearch, game.rules, game.rng),
    ...captured(game.playerResearch, game.rng, game.clients),
    ...complete(game.engine),
    ...cost(),
    ...processYield(game.playerResearch, game.rules),
    ...requirements(),
    ...started(game.engine)
  );

// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
register(defaultGame);

export default register;
