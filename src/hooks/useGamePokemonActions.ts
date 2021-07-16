import { useEffect } from "react";
import { Game } from "../context/AppContext";
import { AppAction } from "../context/AppReducer";
import useAppContextActions from "./useAppContextActions";
import usePlaySound from "./usePlaySound";

export default function useGamePokemonActions(row = 4, col = 8) {
  const {
    playMenuOpen,
    playDisableSound,
    playEnableSound,
    playFanfareSound,
    playGlugSound,
    playBiteSound,
    playRisingPopSound,
    playEndTimeSound,
  } = usePlaySound();
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
    playMenuOpen();
    dispatch({
      type: AppAction.ROTATE_POKEMONS,
    });
  };

  useEffect(() => {
    initGame();
    return () => {};
  }, []);

  const replayGame = () => {
    playEnableSound();
    dispatch({
      type: AppAction.REPLAY_GAME,
    });
  };

  const exitGame = () => {
    playDisableSound();
    dispatch({
      type: AppAction.EXIT_GAME,
      payload: {
        name: null,
      },
    });
  };

  const startGame = () => {
    playFanfareSound();
    dispatch({
      type: AppAction.START_GAME,
      payload: {
        name: null,
      },
    });
  };

  const changeGameMode = () => {
    playMenuOpen();
    dispatch({
      type: AppAction.CHANGE_GAME_MODE,
    });
  };

  const gameState = getGameState();
  const gameSettings = getGameSettings();

  if (gameState.connectingLinePoints.length > 1) {
    playRisingPopSound();
  }

  if (gameState.connectingLinePoints.length === 1) {
    playGlugSound();
  }

  if (gameState.selectedPokemons.length === 1) {
    playBiteSound();
  }

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
    changeGameMode,
    gameSound: {
      playMenuOpen,
      playDisableSound,
      playEnableSound,
      playFanfareSound,
      playGlugSound,
      playBiteSound,
      playRisingPopSound,
      playEndTimeSound,
    },
  };
}
