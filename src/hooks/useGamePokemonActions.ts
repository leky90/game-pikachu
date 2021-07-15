import { useEffect } from "react";
import { Game, GameState } from "../context/AppContext";
import { AppAction } from "../context/AppReducer";
import useAppContextActions from "./useAppContextActions";

export default function useGamePokemonActions(row = 4, col = 8) {
  const { dispatch, getState } = useAppContextActions();

  const initGame = () => {
    dispatch({
      type: AppAction.SET_GAME,
      payload: {
        name: Game.POKEMON,
      },
    });
  };

  const rotatePokemons = () => {
    dispatch({
      type: AppAction.ROTATE_POKEMONS,
      payload: {
        name: Game.POKEMON,
      },
    });
  };

  useEffect(() => {
    initGame();
    return () => {};
  }, []);

  const replayGame = () => {
    dispatch({
      type: AppAction.REPLAY_GAME,
      payload: {
        name: Game.POKEMON,
      },
    });
  };

  const exitGame = () => {
    dispatch({
      type: AppAction.REPLAY_GAME,
      payload: {
        name: Game.POKEMON,
      },
    });
  };

  const startGame = () => {
    alert("Start game.");
  };

  const gameState = getState("gameState") as GameState;

  return {
    row,
    col,
    pokemons: gameState?.pokemons,
    rotatePokemons,
    replayGame,
    startGame,
    exitGame,
  };
}
