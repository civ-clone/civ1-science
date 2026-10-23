import { Requirement } from '@civ-clone/core-requirement/Requirement';
/**
 * The advances each of Civilization's advances needs before a player can research it: one rule each, made by
 * `Rules/Research/requirements`. `registerRules` adds them to the game's `requirements` (civ-clone/web-renderer#37).
 * An advance not listed (Alphabet, Bronze Working, Ceremonial Burial, Horseback Riding, Masonry, Pottery, The Wheel)
 * needs none; Future Technology needs every other advance, which is a rule of its own rather than an entry.
 */
export declare const requiresAdvances: Requirement[];
export default requiresAdvances;
