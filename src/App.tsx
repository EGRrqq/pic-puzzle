import { useEffect, useState } from "react";
import "./App.css";
import { fetchPuzzleEntities, type TPuzzleEntities } from "./api/data";

function App() {
  const [puzzle, setPuzzle] = useState<TPuzzleEntities>({});
  useEffect(() => {
    (async () => {
      const dogPuzzle = await fetchPuzzleEntities();
      setPuzzle(dogPuzzle);
    })();
  }, []);
  console.log(puzzle);

  return <div></div>;
}

export default App;
