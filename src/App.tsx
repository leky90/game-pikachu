import "./App.css";
import GamePokemonPage from "./pages/GamePokemonPage";
import AppProvider from "./context/AppProvider";
import { Page } from "./context/AppContext";
import Route from "./components/Route";
import BoardGamePage from "./pages/BoardGamePage";

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Route match={Page.BOARD} component={<BoardGamePage />} />
        <Route match={Page.POKEMON} component={<GamePokemonPage />} />
      </div>
    </AppProvider>
  );
}

export default App;
