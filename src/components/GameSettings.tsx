import { MouseEventHandler } from "react";
import { GameMode } from "../context/AppContext";

type GameSettingsProps = {
  mode: GameMode;
  changeGameMode: MouseEventHandler;
};

const GameSettings = ({ mode, changeGameMode }: GameSettingsProps) => {
  return (
    <div className="game-settings">
      <button onClick={changeGameMode}>Mode: {mode}</button>
    </div>
  );
};

export default GameSettings;
