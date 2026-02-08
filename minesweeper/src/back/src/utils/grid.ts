/**
* definition of the grid
 */

import { Difficulty } from "../types.interface";

const gridSize = (difficulty: Difficulty): number => {
    /**
     * Set the grid size depending on the difficulty
     * 
 * easy -> 5x5
 * medium -> 10x10
 * hard -> 15x15
*/

switch (difficulty) {
    case "easy":
        return 5;

    case "medium": 
        return 10;

    case "hard":
        return 15;
    
    default:
        // Since we need a default value...
        return 10;
    }




}