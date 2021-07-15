import { useEffect } from "react";
import { Game } from "../context/AppContext";
import { AppAction } from "../context/AppReducer";
import useAppContextActions from "./useAppContextActions";

export default function useGamePokemonActions(row = 4, col = 8) {
  const { dispatch, getGameState, getGameSettings } = useAppContextActions();

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
    });
  };

  useEffect(() => {
    initGame();
    return () => {};
  }, []);

  const replayGame = () => {
    dispatch({
      type: AppAction.REPLAY_GAME,
    });
  };

  const exitGame = () => {
    dispatch({
      type: AppAction.EXIT_GAME,
      payload: {
        name: null,
      },
    });
  };

  const startGame = () => {
    dispatch({
      type: AppAction.START_GAME,
      payload: {
        name: null,
      },
    });
  };

  const gameState = getGameState();
  const gameSettings = getGameSettings();

  return {
    row,
    col,
    pokemons: gameState.pokemons,
    gameSettings,
    gameState,
    rotatePokemons,
    replayGame,
    startGame,
    exitGame,
  };
}
