import AppNavigation from "../components/AppNavigation";
import GamePokemon from "../components/GamePokemon";
import { GameSettings, Page } from "../context/AppContext";
import useAppContextActions from "../hooks/useAppContextActions";
import useGamePokemonActions from "../hooks/useGamePokemonActions";

const GamePokemonPage = () => {
  const { navigate, getState } = useAppContextActions();
  const { replayGame, startGame, rotatePokemons, exitGame } =
    useGamePokemonActions();

  const navItems = [
    { label: "Rotate pokemons", action: () => rotatePokemons() },
    { label: "Start game", action: () => startGame() },
    { label: "Re-play game", action: () => replayGame() },
    {
      label: "Exit game",
      action: () => {
        exitGame();
        navigate(Page.BOARD);
      },
    },
  ];

  const gameSettings = getState("gameSettings") as GameSettings;

  return (
    <div className="game-container">
      <div className="game-board">
        <GamePokemon />
      </div>
      <div className="game-control">
        <h1 className="game-title">{gameSettings?.name}</h1>
        <AppNavigation navItems={navItems} />
      </div>
    </div>
  );
};

export default GamePokemonPage;
