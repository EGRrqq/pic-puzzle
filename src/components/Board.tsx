import { useEffect } from "react";
import { type IGameData } from "../api/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameDataAsync, selectEntity } from "../store/gameSlice";

export default function Board() {
  const dispatch = useDispatch();
  const gameData: IGameData = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(fetchGameDataAsync());
  }, [dispatch]);

  if (gameData.loading) {
    return <p>loading...</p>;
  }

  if (gameData) {
    const entities = gameData.currentPuzzleEntities;

    return (
      <section
        className={`grid gap-2 scale-50`}
        style={{
          gridTemplate: `repeat(${gameData.currentPuzzle.grid.col},1fr) / repeat(${gameData.currentPuzzle.grid.row},1fr)`,
        }}
      >
        {entities &&
          Object.keys(entities).map((key) => {
            const entity = gameData.currentPuzzleEntities[key];

            return (
              <button
                key={key}
                onClick={() => {
                  dispatch(selectEntity(entity));
                  console.log(gameData);
                }}
                style={{
                  border: entity.isCorrect
                    ? "5px solid green"
                    : "5px solid red",
                }}
              >
                <img
                  src={`/pic-puzzle/doggo-puzzle_1_4x4/${key}`}
                  height={296}
                  width={299}
                />
              </button>
            );
          })}
      </section>
    );
  }

  return <></>;
}
