import { useEffect, useState } from "react";
import useAppContextActions from "../hooks/useAppContextActions";
import { timeConvert } from "../utils/time";

type GameInfoProps = {
  gameTiming: number;
};

const GameInfo = ({ gameTiming }: GameInfoProps) => {
  const [timing, setTiming] = useState(gameTiming);
  const { getGameSettings, getGameState } = useAppContextActions();

  const gameSettings = getGameSettings();
  const gameState = getGameState();

  const points = Object.keys(gameState.pokemons).reduce((count, pokemonId) => {
    if (gameState.pokemons[pokemonId].matched) count++;
    return count;
  }, 0);

  useEffect(() => {
    if (gameState.running) {
      setTimeout(() => {
        if (gameTiming > 0) {
          setTiming(timing - 1);
        } else {
          setTiming(timing + 1);
        }
      }, 1000);
    } else {
      setTiming(0);
    }
    return () => {
      if (!gameState.running) {
        console.log("clear", gameState.running);
      }
    };
  }, [timing, gameState.running, gameTiming]);

  return (
    <div className="game-info">
      <h1 className="game-title">{gameSettings?.name}</h1>
      <p className="game-score">Point: {points}</p>
      <p className="game-score">Timing: {timeConvert(timing)}</p>
    </div>
  );
};

export default GameInfo;
