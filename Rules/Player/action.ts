import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import {
  canResearch,
  chooseResearch,
  notResearching,
} from '@civ-clone/base-science-research/lib/choose';
import Action from '@civ-clone/core-player/Rules/Action';
import { ChooseResearch } from '../../PlayerActions';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import isBarbarian from '@civ-clone/base-civilization-barbarian/isBarbarian';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry
) => Action[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance
): Action[] => [
  new Action(
    'civ1-science:player/action/choose-research',
    // Barbarians never research (civ-clone/web-renderer#169).
    new Criterion((player: Player): boolean => !isBarbarian(player)),
    new Criterion(notResearching(playerResearchRegistry)),
    new Criterion(canResearch(playerResearchRegistry)),
    new Effect(chooseResearch(ChooseResearch, playerResearchRegistry))
  ),
];

export default getRules;
