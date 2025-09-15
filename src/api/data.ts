import { createPuzzleEntities } from "./actions";

export interface ICell {
  col: number;
  row: number;
}

export interface IPuzzleData {
  puzzle: string[];
  grid: ICell;
}

interface IPuzzleEntity {
  currentPos: ICell;
  correctPos: ICell;
  isCorrect: boolean;
}

/** where string is a file name like 'image1x1.webp' */
export type TPuzzleEntities = Record<string, IPuzzleEntity>;

export interface IGameData {
  currentPuzzle: IPuzzleData;
  currentPuzzleEntities: TPuzzleEntities;
  entitySelected: IPuzzleEntity | null;
  isGameEnded: boolean;
  entityAmount: number;
  correctEntityAmount: number;
}

const doggoPuzzle: string[] = [
  "image1x1.webp",
  "image2x1.webp",
  "image3x1.webp",
  "image4x1.webp",

  "image1x2.webp",
  "image2x2.webp",
  "image3x2.webp",
  "image4x2.webp",

  "image1x3.webp",
  "image2x3.webp",
  "image3x3.webp",
  "image4x3.webp",

  "image1x4.webp",
  "image2x4.webp",
  "image3x4.webp",
  "image4x4.webp",
];

const doggoPuzzleData: IPuzzleData = Object.freeze({
  puzzle: doggoPuzzle,
  grid: {
    col: 4,
    row: 4,
  },
});

/** mockup data from the "server" */
const createGameData = (puzzleData: IPuzzleData): IGameData => {
  const currentPuzzleEntities = createPuzzleEntities(puzzleData, {
    shuffle: false,
  });

  // Calculate initial correct entity count
  const correctEntityAmount = Object.values(currentPuzzleEntities).filter(
    (entity) => entity.isCorrect
  ).length;

  return {
    currentPuzzle: puzzleData,
    currentPuzzleEntities,
    entitySelected: null,
    isGameEnded: false,
    entityAmount: puzzleData.puzzle.length,
    correctEntityAmount,
  };
};

/** fetch imitation */
export const fetchGameData: () => Promise<IGameData> = () => {
  return new Promise((res) => res(createGameData(doggoPuzzleData)));
};
