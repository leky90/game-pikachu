import AppNavigation from "../components/AppNavigation";
import GameInfo from "../components/GameInfo";
import GameOverlay from "../components/GameOverlay";
import GamePokemon from "../components/GamePokemon";
import GameSettings from "../components/GameSettings";
import useGamePokemonActions from "../hooks/useGamePokemonActions";
import GameResult from "../components/GameResult";

const GamePokemonPage = () => {
  const {
    replayGame,
    startGame,
    rotatePokemons,
    exitGame,
    changeGameMode,
    gameState,
    gameSettings,
  } = useGamePokemonActions();

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
        {gameState.connectingLinePoints.length > 0 && <GameOverlay />}
        {gameState.running && <GamePokemon />}
        <GameResult />
      </div>
      <div className="game-control">
        <GameInfo gameTiming={gameSettings.settings.timing} />
        {!gameState.running && (
          <GameSettings
            mode={gameSettings.settings.mode}
            changeGameMode={changeGameMode}
          />
        )}
        <AppNavigation navItems={navItems} />
      </div>
    </div>
  );
};

export default GamePokemonPage;
