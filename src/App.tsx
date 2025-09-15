import "./App.css";
import Board from "./components/Board";
import EntityStatus from "./components/EntityStatus";

function App() {
  return (
    <main className="grid place-content-center-safe">
      <Board />
      <EntityStatus />
    </main>
  );
}

export default App;
