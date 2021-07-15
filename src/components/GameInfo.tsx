import { useEffect, useState } from "react";
import useAppContextActions from "../hooks/useAppContextActions";
import { timeConvert } from "../utils/TimeHelper";

const GameInfo = () => {
  const [timing, setTiming] = useState(0);
  const { getGameSettings, getGameState } = useAppContextActions();

  const gameSettings = getGameSettings();
  const gameState = getGameState();

  const points = Object.keys(gameState.pokemons).reduce((count, pokemonId) => {
    if (gameState.pokemons[pokemonId].matched) count++;
    return count;
  }, 0);

  useEffect(() => {
    console.log("gameState.running", gameState.running);
    // let timeInterval: NodeJS.Timeout | null = null;
    if (gameState.running) {
      setTimeout(() => {
        setTiming(timing + 1);
      }, 1000);
    } else {
      setTiming(0);
    }
    return () => {
      if (!gameState.running) {
        console.log("clear", gameState.running);
      }
    };
  }, [timing, gameState.running]);

  return (
    <div className="game-info">
      <h1 className="game-title">{gameSettings?.name}</h1>
      <p className="game-score">Point: {points}</p>
      <p className="game-score">Timing: {timeConvert(timing)}</p>
    </div>
  );
};

export default GameInfo;
