"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const action_1 = require("./Rules/Player/action");
const added_1 = require("./Rules/Player/added");
const captured_1 = require("./Rules/City/captured");
const complete_1 = require("./Rules/Research/complete");
const cost_1 = require("./Rules/Research/cost");
const process_yield_1 = require("./Rules/City/process-yield");
const requirements_1 = require("./Rules/Research/requirements");
const started_1 = require("./Rules/Research/started");
const core_game_1 = require("@civ-clone/core-game");
const register = (game) => game.rules.register(...(0, action_1.default)(game.playerResearch), ...(0, added_1.default)(game.advances, game.playerResearch, game.rules, game.rng), ...(0, captured_1.default)(game.playerResearch, game.rng, game.clients), ...(0, complete_1.default)(game.engine), ...(0, cost_1.default)(), ...(0, process_yield_1.default)(game.playerResearch, game.rules), ...(0, requirements_1.default)(), ...(0, started_1.default)(game.engine));
exports.register = register;
// The plugin loader imports each package for this side effect. Until it passes
// a `Game` of its own, dropping it would produce a game with silently absent
// rules — no error, just wrong behaviour.
(0, exports.register)(core_game_1.defaultGame);
exports.default = exports.register;
//# sourceMappingURL=registerRules.js.map