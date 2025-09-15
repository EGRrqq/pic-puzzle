import type { ICell, IPuzzleData, TPuzzleEntities } from "./data";

interface IEntitiesOptions {
  shuffle: boolean;
}

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

/**  generate all possible grid positions */
const generateAllPositions = (grid: ICell): ICell[] => {
  const allPositions: ICell[] = [];
  for (let col = 1; col <= grid.col; col++) {
    for (let row = 1; row <= grid.row; row++) {
      allPositions.push({ col, row });
    }
  }

  return allPositions;
};

const entitiesOptions: IEntitiesOptions = {
  shuffle: true,
};

/** create game data from the original array of puzzle images + grid size */
export const createPuzzleEntities = (
  data: IPuzzleData,
  options: IEntitiesOptions = entitiesOptions
): TPuzzleEntities => {
  // create entities object
  const entities: TPuzzleEntities = {};

  data.puzzle.forEach((filename, index) => {
    const pos = parsePuzzlePosition(filename);
    const correctPos = pos;
    const currentPos = options.shuffle
      ? shuffleArray(generateAllPositions(data.grid))[index]
      : pos;

    entities[filename] = {
      currentPos,
      correctPos,
      isCorrect:
        currentPos.col === correctPos.col && currentPos.row === correctPos.row,
    };
  });

  return entities;
};
