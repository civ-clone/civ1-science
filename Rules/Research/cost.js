"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Cost_1 = require("@civ-clone/core-science/Rules/Cost");
const Effect_1 = require("@civ-clone/core-rule/Effect");
// see: https://forums.civfanatics.com/threads/how-many-bulbs-need-for-the-current-tech.376195/#post-13810088
const getRules = () => [
    new Cost_1.default(new Effect_1.default((CostAdvance, playerResearch) => (playerResearch.complete().length + 1) *
        (6 +
            2 *
                // playerResearch.player()
                //   .difficultyLevel ||
                0))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=cost.js.map