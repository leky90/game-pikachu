import { useEffect, useState } from "react";
import { GameStatus } from "../context/AppContext";
import useAppContextActions from "../hooks/useAppContextActions";
import { timeConvert } from "../utils/time";

type GameInfoProps = {
  failedGame: () => void;
  gameSound: Record<string, Function>;
  gamePoints: number;
};

const GameInfo = ({ failedGame, gameSound, gamePoints }: GameInfoProps) => {
  const { getGameSettings, getGameState } = useAppContextActions();
  const gameSettings = getGameSettings();
  const gameState = getGameState();
  const { timing: timingSetting, bonusTime } = gameSettings.settings;

  let [limitTime, setLimitTime] = useState<number>(timingSetting);

  useEffect(() => {
    setLimitTime(limitTime + bonusTime);
  }, [gamePoints]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (gameState.running || gameState.status !== GameStatus.PENDING) {
      timeoutId = setTimeout(() => {
        if (timingSetting > 0) {
          if (limitTime === 60) {
            gameSound.playNearlyEndTimeSound();
          }
          if (limitTime <= 0) {
            failedGame();
          } else {
            setLimitTime(limitTime - 1);
          }
        } else {
          setLimitTime(limitTime + 1);
        }
      }, 1000);
    } else {
      setLimitTime(timingSetting);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [limitTime, gameState.running, timingSetting]);

  return (
    <div className="game-info">
      <h1 className="game-title">{gameSettings?.name}</h1>
      <p className="game-score">Time bonus: {(gamePoints / 2) * bonusTime}</p>
      <p className="game-score">Timing remaining: {timeConvert(limitTime)}</p>
    </div>
  );
};

export default GameInfo;
