"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const ClientRegistry_1 = require("@civ-clone/core-client/ClientRegistry");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const captured_1 = require("@civ-clone/base-science-research/lib/captured");
const Captured_1 = require("@civ-clone/core-city/Rules/Captured");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const isBarbarian_1 = require("@civ-clone/base-civilization-barbarian/isBarbarian");
const core_random_1 = require("@civ-clone/core-random");
const getRules = (playerResearchRegistry = PlayerResearchRegistry_1.instance, randomNumberGenerator = core_random_1.instance, clientRegistry = ClientRegistry_1.instance) => [
    new Captured_1.default('civ1-science:city/captured/steal-advance', 
    // Barbarians take no advance from a city, and none can be taken from them (civ-clone/web-renderer#169).
    new Criterion_1.default((capturedCity, capturingPlayer, player) => !(0, isBarbarian_1.default)(capturingPlayer) && !(0, isBarbarian_1.default)(player)), new Criterion_1.default((0, captured_1.hasAdvanceToTake)(playerResearchRegistry)), new Effect_1.default((0, captured_1.takeAdvance)(playerResearchRegistry, clientRegistry))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=captured.js.map