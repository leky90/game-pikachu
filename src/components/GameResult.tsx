import useAppContextActions from "../hooks/useAppContextActions";
import { timeConvert } from "../utils/time";

const GameResult = () => {
  const { getGameSettings } = useAppContextActions();

  return <div className="game-result"></div>;
};

export default GameResult;
