"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const ClientRegistry_1 = require("@civ-clone/core-client/ClientRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Captured_1 = require("@civ-clone/core-city/Rules/Captured");
const ChoiceMeta_1 = require("@civ-clone/core-client/ChoiceMeta");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance, randomNumberGenerator = () => Math.random(), clientRegistry = ClientRegistry_1.instance) => [
    new Captured_1.default(new Criterion_1.default((capturedCity, capturingPlayer, player) => playerResearchRegistry
        .getByPlayer(player)
        .complete()
        .some((advance) => !playerResearchRegistry
        .getByPlayer(capturingPlayer)
        .completed(advance.constructor))), new Effect_1.default(async (capturedCity, capturingPlayer, player) => {
        const capturingPlayerResearch = playerResearchRegistry.getByPlayer(capturingPlayer);
        const available = playerResearchRegistry
            .getByPlayer(player)
            .complete()
            .map((advance) => advance.sourceClass())
            .filter((AdvanceType) => !capturingPlayerResearch.completed(AdvanceType)), client = clientRegistry.getByPlayer(capturingPlayer), ChosenAdvance = await client.chooseFromList(new ChoiceMeta_1.default(available, 'capture-city.steal-advance', capturedCity));
        capturingPlayerResearch.addAdvance(ChosenAdvance);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=captured.js.map