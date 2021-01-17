"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const Advances_1 = require("../../Advances");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Requirements_1 = require("@civ-clone/core-science/Rules/Requirements");
const getRules = () => [
    ...[
        [Advances_1.Astronomy, Advances_1.Mathematics, Advances_1.Mysticism],
        [Advances_1.BridgeBuilding, Advances_1.Construction, Advances_1.IronWorking],
        [Advances_1.Chivalry, Advances_1.Feudalism, Advances_1.HorsebackRiding],
        [Advances_1.CodeOfLaws, Advances_1.Alphabet],
        [Advances_1.Construction, Advances_1.Currency, Advances_1.Masonry],
        [Advances_1.Currency, Advances_1.BronzeWorking],
        [Advances_1.Engineering, Advances_1.Construction, Advances_1.TheWheel],
        [Advances_1.Feudalism, Advances_1.Masonry, Advances_1.Monarchy],
        [Advances_1.Gunpowder, Advances_1.Invention, Advances_1.IronWorking],
        [Advances_1.Invention, Advances_1.Engineering, Advances_1.Literacy],
        [Advances_1.IronWorking, Advances_1.BronzeWorking],
        [Advances_1.Literacy, Advances_1.CodeOfLaws, Advances_1.Writing],
        [Advances_1.MapMaking, Advances_1.Alphabet],
        [Advances_1.Mathematics, Advances_1.Alphabet, Advances_1.Masonry],
        [Advances_1.Monarchy, Advances_1.CodeOfLaws, Advances_1.Mysticism],
        [Advances_1.Mysticism, Advances_1.CeremonialBurial],
        [Advances_1.Navigation, Advances_1.Astronomy, Advances_1.MapMaking],
        [Advances_1.TheRepublic, Advances_1.CodeOfLaws, Advances_1.Literacy],
        [Advances_1.Writing, Advances_1.Alphabet],
    ].map(([AdvanceWithRequirements, ...requiredAdvances]) => new Requirements_1.default(new Criterion_1.default((CheckAdvance) => CheckAdvance === AdvanceWithRequirements), new Effect_1.default((CheckAdvance, discoveredAdvances) => requiredAdvances.every((RequiredAdvance) => discoveredAdvances.some((advance) => advance instanceof RequiredAdvance))))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=requirements.js.map