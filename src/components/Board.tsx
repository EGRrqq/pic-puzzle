import { useEffect, useState } from "react";
import { fetchGameData, type IGameData } from "../api/data";

export default function Board() {
  const [gameData, setGameData] = useState<IGameData>();
  useEffect(() => {
    (async () => {
      const gameData = await fetchGameData();
      setGameData(gameData);
    })();
  }, []);

  if (gameData) {
    const entities = gameData.currentPuzzleEntities;
    console.log(Object.keys(entities));

    return (
      <section
        className={`grid gap-2`}
        style={{
          gridTemplate: `repeat(${gameData.currentPuzzle.grid.col},1fr) / repeat(${gameData.currentPuzzle.grid.row},1fr)`,
        }}
      >
        {entities &&
          Object.keys(entities).map((key) => (
            <button key={key}>
              <img
                src={`/doggo-puzzle_1_4x4/${key}`}
                height={297}
                width={300}
              />
            </button>
          ))}
      </section>
    );
  }

  return <></>;
}
