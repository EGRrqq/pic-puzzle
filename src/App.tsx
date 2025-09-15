import "./App.css";
import { useEffect, useState } from "react";
import { fetchGameData, type IGameData } from "./api/data";

function App() {
  const [gameData, setGameData] = useState<IGameData>();
  useEffect(() => {
    (async () => {
      const gameData = await fetchGameData();
      setGameData(gameData);
    })();
  }, []);
  console.log(gameData);

  return <div></div>;
}

export default App;
