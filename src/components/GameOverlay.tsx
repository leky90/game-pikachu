import { FC } from "react";
import LineRow from "./LineRow";
import useAppContextActions from "../hooks/useAppContextActions";

type GameOverlayProps = {};

const GameOverlay: FC<GameOverlayProps> = () => {
  const { getGameState, getGameSettings } = useAppContextActions();
  const { matrix, connectingLinePoints } = getGameState();
  const {
    settings: { col, mode },
  } = getGameSettings();

  const columnCards = new Array(col + 2).fill(false);

  return (
    <div className={`game-overlay mode-${mode}`}>
      {matrix &&
        matrix.map((_, index) => (
          <LineRow
            key={`row-${index}`}
            cards={columnCards}
            rowIndex={index}
            connectingLinePoints={connectingLinePoints}
          />
        ))}
    </div>
  );
};

export default GameOverlay;
