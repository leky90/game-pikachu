import {
  AppStore,
  GameMode,
  gameOptions,
  GameState,
  GameStatus,
  initialGameState,
  Page,
  PointCoords,
} from "../context/AppContext";
import {
  hasConnectLine,
  generatePokemonMatrix,
  makeListPokemons,
  reShufflePokemonList,
  drawPath,
} from "../utils/game";

export const setGameReducer = (state: AppStore, payload: any): AppStore => {
  const { row, col } = state.gameSettings.settings;
  const pokemons = makeListPokemons(row, col);
  const matrix = generatePokemonMatrix(pokemons, row, col);

  return {
    ...state,
    gameSettings: {
      ...state.gameSettings,
      ...payload,
    },
    gameState: {
      ...state.gameState,
      selectedPokemons: [],
      pokemons,
      matrix: [...matrix],
    },
  };
};

export const startGameReducer = (state: AppStore): AppStore => {
  return {
    ...state,
    gameState: { ...state.gameState, running: true },
  };
};

export const replayGameReducer = (state: AppStore): AppStore => {
  const { row, col } = state.gameSettings.settings;
  const pokemons = makeListPokemons(row, col);
  const matrix = generatePokemonMatrix(pokemons, row, col);

  return {
    ...state,
    gameState: {
      running: false,
      connectingLinePoints: [],
      selectedPokemons: [],
      pokemons,
      status: GameStatus.PENDING,
      matrix: [...matrix],
    },
  };
};

export const exitGameReducer = (state: AppStore): AppStore => {
  return {
    ...state,
    page: Page.BOARD,
    gameState: { ...initialGameState },
  };
};

export const rotatePokemonsReducer = (state: AppStore): AppStore => {
  const { row, col } = state.gameSettings.settings;
  const pokemons = reShufflePokemonList(state.gameState.pokemons);
  const matrix = generatePokemonMatrix(pokemons, row, col);

  return {
    ...state,
    gameState: {
      ...state.gameState,
      connectingLinePoints: [],
      selectedPokemons: [],
      pokemons,
      matrix,
    },
  };
};

export const unSelectPokemonCardReducer = (state: AppStore): AppStore => {
  return {
    ...state,
    gameState: {
      ...state.gameState,
      selectedPokemons: [],
    },
  };
};

export const selectPokemonCardReducer = (
  state: AppStore,
  payload: any
): AppStore => {
  let matrix = state.gameState?.matrix ? [...state.gameState?.matrix] : [];
  const selectedPokemons = state.gameState?.selectedPokemons
    ? [...state.gameState?.selectedPokemons]
    : [];

  if (selectedPokemons.length >= 2) {
    selectedPokemons.length = 0;
  }

  selectedPokemons.push(payload);

  const pokemons = state.gameState?.pokemons
    ? { ...state.gameState?.pokemons }
    : {};

  const { row: rowSetting, col: colSetting } = state.gameSettings.settings;
  const [selectedPokemon1, selectedPokemon2] = selectedPokemons;

  let connectingLinePoints: PointCoords[] = [];

  if (
    selectedPokemon1?.nid &&
    selectedPokemon2?.nid &&
    pokemons[selectedPokemon1.nid].id === pokemons[selectedPokemon2.nid].id
  ) {
    const { connected, pathPoints } = hasConnectLine(
      selectedPokemon1,
      selectedPokemon2,
      matrix,
      rowSetting,
      colSetting
    );

    if (connected) {
      connectingLinePoints = drawPath(pathPoints, rowSetting, colSetting);

      pokemons[selectedPokemon1.nid] = {
        ...pokemons[selectedPokemon1.nid],
        matched: true,
      };
      pokemons[selectedPokemon2.nid] = {
        ...pokemons[selectedPokemon2.nid],
        matched: true,
      };
      matrix = generatePokemonMatrix(pokemons, rowSetting, colSetting);
    } else {
      selectedPokemons.length = 0;
    }
  } else {
    if (selectedPokemons.length === 2) {
      selectedPokemons.length = 0;
      connectingLinePoints = [{ rowIndex: -1, colIndex: -1 }];
    }
  }

  return {
    ...state,
    gameState: {
      running: true,
      connectingLinePoints,
      pokemons,
      matrix,
      selectedPokemons,
    } as GameState,
  };
};

export const changeGameModeReducer = (state: AppStore): AppStore => {
  const currentMode = state.gameSettings.settings.mode;
  let newMode = GameMode.NORMAL;
  switch (currentMode) {
    case GameMode.NORMAL:
      newMode = GameMode.HARD;
      break;

    case GameMode.HARD:
      newMode = GameMode.EASY;
      break;

    default:
      newMode = GameMode.NORMAL;
      break;
  }

  const { row, col, timing, bonusTime } = gameOptions[newMode];
  const pokemons = makeListPokemons(row, col);
  const matrix = generatePokemonMatrix(pokemons, row, col);

  return {
    ...state,
    gameSettings: {
      ...state.gameSettings,
      settings: {
        ...state.gameSettings.settings,
        mode: newMode,
        timing,
        row,
        col,
        bonusTime,
      },
    },
    gameState: {
      ...state.gameState,
      matrix,
      pokemons,
      running: false,
      connectingLinePoints: [],
      selectedPokemons: [],
    },
  };
};

export const changeGameStatusReducer = (
  state: AppStore,
  payload: any
): AppStore => {
  return {
    ...state,
    gameState: {
      ...state.gameState,
      status: payload,
    },
  };
};
