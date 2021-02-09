import {
  PlayerResearchRegistry,
  instance as playerResearchRegistryInstance,
} from '@civ-clone/core-science/PlayerResearchRegistry';
import Action from '@civ-clone/core-player/Rules/Action';
import { ChooseResearch } from '../../PlayerActions';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerAction from '@civ-clone/core-player/PlayerAction';

export const getRules: (
  playerResearchRegistry?: PlayerResearchRegistry
) => Action[] = (
  playerResearchRegistry: PlayerResearchRegistry = playerResearchRegistryInstance
): Action[] => [
  new Action(
    new Criterion(
      (player: Player): boolean =>
        playerResearchRegistry.getByPlayer(player).researching() !== null
    ),
    new Criterion(
      (player: Player): boolean =>
        playerResearchRegistry.getByPlayer(player).available().length > 0
    ),
    new Effect((player: Player): PlayerAction[] => [
      new ChooseResearch(playerResearchRegistry.getByPlayer(player)),
    ])
  ),
];

export default getRules;
