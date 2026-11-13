"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Started_1 = require("@civ-clone/core-science/Rules/Started");
const events_1 = require("@civ-clone/base-science-research/lib/events");
const getRules = (engine = Engine_1.instance) => [
    new Started_1.default('civ1-science:research/started/emit', new Effect_1.default((0, events_1.emitResearchStarted)(engine))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=started.js.map