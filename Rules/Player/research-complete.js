"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Complete_1 = require("@civ-clone/core-science/Rules/Complete");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Engine_1 = require("@civ-clone/core-engine/Engine");
const getRules = () => [
    new Complete_1.default(new Effect_1.default((playerResearch, advance) => {
        Engine_1.instance.emit('player:research-complete', playerResearch, advance);
    })),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=research-complete.js.map