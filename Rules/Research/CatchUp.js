"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchUp = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
/**
 * Whether a player's rate of research cost rises when the leader is ahead of schedule (civ-clone/web-renderer#1077):
 * v474.05's from AD. The first rule that applies decides; with none, it doesn't.
 */
class CatchUp extends Rule_1.default {
}
exports.CatchUp = CatchUp;
exports.default = CatchUp;
//# sourceMappingURL=CatchUp.js.map