"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Captured_1 = require("@civ-clone/core-city/Rules/Captured");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance, randomNumberGenerator = () => Math.random()) => [
    new Captured_1.default(new Criterion_1.default((capturedCity, capturingPlayer, player) => playerResearchRegistry
        .getByPlayer(player)
        .complete()
        .some((advance) => !playerResearchRegistry
        .getByPlayer(capturingPlayer)
        .completed(advance.constructor))), 
    // TODO: have `Player#chooseAdvance` or something
    new Effect_1.default((capturedCity, capturingPlayer, player) => {
        const capturingPlayerResearch = playerResearchRegistry.getByPlayer(capturingPlayer);
        const available = playerResearchRegistry
            .getByPlayer(player)
            .complete()
            .filter((advance) => !capturingPlayerResearch.completed(advance.constructor));
        capturingPlayerResearch.addAdvance(available.map((advance) => advance.constructor)[Math.floor(randomNumberGenerator() * available.length)]);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=captured.js.map