"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateMultiplier = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
/**
 * What a player's rate of research cost is multiplied by now (civ-clone/web-renderer#1077): v474.05's doubles it from
 * AD. The first rule that applies decides; with none, it is v474.05's.
 */
class RateMultiplier extends Rule_1.default {
}
exports.RateMultiplier = RateMultiplier;
exports.default = RateMultiplier;
//# sourceMappingURL=RateMultiplier.js.map