import type { ICell, IPuzzleData, TPuzzleEntities } from "./data";

/** Helper function to shuffle array */
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/** Parse position from filename
 * @example
 * parsePuzzlePosition("image4x2.webp")
 */
const parsePuzzlePosition = (filename: string) => {
  const match = filename.match(/image(\d+)x(\d+)\.webp/);

  if (!match) {
    throw new RangeError(
      `Invalid filename format: expected "image{col}x{row}.webp", got "${filename}"`
    );
  }

  return {
    col: parseInt(match[1]),
    row: parseInt(match[2]),
  };
};

/** create game data from the original array of puzzle images + grid size */
export const createPuzzleEntities = (data: IPuzzleData): TPuzzleEntities => {
  // generate all possible grid positions
  const allPositions: ICell[] = [];
  for (let col = 1; col <= data.grid.col; col++) {
    for (let row = 1; row <= data.grid.row; row++) {
      allPositions.push({ col, row });
    }
  }

  // shuffle the positions
  const shuffledPositions = shuffleArray(allPositions);

  // create entities object
  const entities: TPuzzleEntities = {};

  data.puzzle.forEach((filename, index) => {
    const correctPos = parsePuzzlePosition(filename);
    const currentPos = shuffledPositions[index];

    entities[filename] = {
      currentPos,
      correctPos,
      isCorrect:
        currentPos.col === correctPos.col && currentPos.row === correctPos.row,
    };
  });

  return entities;
};
