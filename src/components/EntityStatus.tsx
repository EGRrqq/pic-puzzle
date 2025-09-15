import { useSelector } from "react-redux";
import type { IGameData } from "../api/data";
import { useEffect } from "react";

export default function EntityStatus() {
  const gameData: IGameData = useSelector((state) => state.game);
  useEffect(() => {}, [gameData]);

  if (gameData.entitySelected) {
    return (
      <p className="absolute right-0 top-50 font-bold text-5xl">
        {gameData.entitySelected?.currentPos.col},{" "}
        {gameData.entitySelected?.currentPos.row}
      </p>
    );
  }

  return <></>;
}
