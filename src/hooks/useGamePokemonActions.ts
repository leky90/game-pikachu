import { useEffect, useLayoutEffect } from "react";
import { Game, GameStatus } from "../context/AppContext";
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
    playNearlyEndTimeSound,
    playFailedGameSound,
    playCompleteGameSound,
    playGameSong,
    stopGameSong,
    pauseGameSong,
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

  const failedGame = () => {
    playFailedGameSound();
    dispatch({
      type: AppAction.FAILED_GAME,
      payload: GameStatus.FAILED,
    });
  };

  const completedGame = () => {
    playCompleteGameSound();
    dispatch({
      type: AppAction.COMPLETED_GAME,
      payload: GameStatus.COMPLETED,
    });
  };

  const rotatePokemons = () => {
    playMenuOpen();
    dispatch({
      type: AppAction.ROTATE_POKEMONS,
    });
  };

  const replayGame = () => {
    playEnableSound();
    // pauseGameSong();
    dispatch({
      type: AppAction.REPLAY_GAME,
    });
  };

  const exitGame = () => {
    playDisableSound();
    // pauseGameSong();
    dispatch({
      type: AppAction.EXIT_GAME,
      payload: {
        name: null,
      },
    });
  };

  const startGame = () => {
    playFanfareSound();
    // playGameSong();
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

  const selectPokemon = (
    pokemonId: string,
    rowIndex: number,
    colIndex: number
  ) => {
    playBiteSound();
    dispatch({
      type: AppAction.SELECT_POKEMON,
      payload: { nid: pokemonId, rowIndex, colIndex },
    });
  };

  const gameState = getGameState();
  const gameSettings = getGameSettings();

  const gamePoints = Object.keys(gameState.pokemons).reduce(
    (count, pokemonId) => {
      if (gameState.pokemons[pokemonId].matched) count++;
      return count;
    },
    0
  );

  useEffect(() => {
    initGame();
    return () => {};
  }, []);

  useEffect(() => {
    document.body.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      playDisableSound();
      dispatch({
        type: AppAction.UNSELECT_POKEMON,
      });
    });
    return () => {
      document.body.removeEventListener("contextmenu", (e) => {
        e.preventDefault();
        playDisableSound();
        dispatch({
          type: AppAction.UNSELECT_POKEMON,
        });
      });
    };
  }, [gameState.running]);

  useEffect(() => {
    if (Object.keys(gameState.pokemons).length === gamePoints) {
      completedGame();
    }
  }, [gamePoints]);

  useEffect(() => {
    if (gameState.connectingLinePoints.length > 1) {
      playRisingPopSound();
      // dispatch({
      //   type: AppAction.CHECK_RULE,
      // });
    }

    if (gameState.connectingLinePoints.length === 1) {
      playGlugSound();
    }

    if (gameState.selectedPokemons.length === 1) {
      playBiteSound();
    }
  }, [gameState.connectingLinePoints.length]);

  return {
    row,
    col,
    pokemons: gameState.pokemons,
    gameSettings,
    gameState,
    gamePoints,
    rotatePokemons,
    replayGame,
    startGame,
    exitGame,
    failedGame,
    completedGame,
    changeGameMode,
    selectPokemon,
    gameSound: {
      playMenuOpen,
      playDisableSound,
      playEnableSound,
      playFanfareSound,
      playGlugSound,
      playBiteSound,
      playRisingPopSound,
      playNearlyEndTimeSound,
      playFailedGameSound,
      playCompleteGameSound,
    },
  };
}
