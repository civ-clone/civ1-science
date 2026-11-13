"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const Complete_1 = require("@civ-clone/core-science/Rules/Complete");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const events_1 = require("@civ-clone/base-science-research/lib/events");
const getRules = (engine = Engine_1.instance) => [
    new Complete_1.default('civ1-science:research/complete/emit', new Effect_1.default((0, events_1.emitResearchComplete)(engine))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=complete.js.map