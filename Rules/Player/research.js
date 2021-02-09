"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Started_1 = require("@civ-clone/core-science/Rules/Started");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Engine_1 = require("@civ-clone/core-engine/Engine");
const getRules = () => [
    new Started_1.default(new Effect_1.default((playerResearch, advance) => {
        Engine_1.instance.emit('player:research', playerResearch, advance);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=research.js.map