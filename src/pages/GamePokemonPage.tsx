import AppNavigation from "../components/AppNavigation";
import GameInfo from "../components/GameInfo";
import GamePokemon from "../components/GamePokemon";
import useGamePokemonActions from "../hooks/useGamePokemonActions";

const GamePokemonPage = () => {
  const { replayGame, startGame, rotatePokemons, exitGame, gameState } =
    useGamePokemonActions();

  let navItems = [
    {
      label: "Exit game",
      action: () => exitGame(),
    },
  ];

  if (gameState.running) {
    navItems = [
      { label: "Rotate pokemons", action: () => rotatePokemons() },
      { label: "Re-play game", action: () => replayGame() },
      ...navItems,
    ];
  } else {
    navItems = [
      { label: "Start game", action: () => startGame() },
      ...navItems,
    ];
  }

  return (
    <div className="game-container">
      <div className="game-board">
        <GamePokemon />
      </div>
      <div className="game-control">
        <GameInfo />
        <AppNavigation navItems={navItems} />
      </div>
    </div>
  );
};

export default GamePokemonPage;
