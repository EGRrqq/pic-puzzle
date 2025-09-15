import { createPuzzleEntities } from "./actions";

export interface ICell {
  col: number;
  row: number;
}

export interface IPuzzleData {
  puzzle: string[];
  grid: ICell;
}

interface PuzzleEntity {
  currentPos: ICell;
  correctPos: ICell;
  isCorrect: boolean;
}

export type TPuzzleEntities = Record<string, PuzzleEntity>;

const doggoPuzzle: string[] = [
  "image1x1.webp",
  "image1x3.webp",
  "image2x1.webp",
  "image2x3.webp",
  "image3x1.webp",
  "image3x3.webp",
  "image4x1.webp",
  "image4x3.webp",
  "image1x2.webp",
  "image1x4.webp",
  "image2x2.webp",
  "image2x4.webp",
  "image3x2.webp",
  "image3x4.webp",
  "image4x2.webp",
  "image4x4.webp",
];

const doggoPuzzleData: IPuzzleData = {
  puzzle: doggoPuzzle,
  grid: {
    col: 4,
    row: 4,
  },
};

/** mockup data from the "server" */
const doggoPuzzleEntities = createPuzzleEntities(doggoPuzzleData);

/** fetch imitation */
export const fetchPuzzleEntities: () => Promise<TPuzzleEntities> = () => {
  return new Promise((res) => res(doggoPuzzleEntities));
};
