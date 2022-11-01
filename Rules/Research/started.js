"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Engine_1 = require("@civ-clone/core-engine/Engine");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Started_1 = require("@civ-clone/core-science/Rules/Started");
const getRules = (engine = Engine_1.instance) => [
    new Started_1.default(new Effect_1.default((playerResearch, AdvanceToResearch) => {
        engine.emit('player:research', playerResearch, AdvanceToResearch);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=started.js.map