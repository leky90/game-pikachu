import {
  AppStore,
  GameState,
  initialGameState,
  Page,
} from "../context/AppContext";
import {
  checkAvailableLine,
  generatePokemonMatrix,
  makeListPokemons,
} from "../utils/GamePokemonHelpers";

export const setGameReducer = (state: AppStore, payload: any): AppStore => {
  const pokemons = makeListPokemons();
  const matrix = generatePokemonMatrix(pokemons);
  return {
    ...state,
    gameSettings: {
      ...payload,
    },
    gameState: {
      ...state.gameState,
      selectedPokemons: [],
      pokemons,
      matrix,
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
  const pokemons = makeListPokemons(true);
  const matrix = generatePokemonMatrix(pokemons);

  return {
    ...state,
    gameState: {
      running: false,
      selectedPokemons: [],
      pokemons,
      matrix,
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
  const pokemons = makeListPokemons();
  const matrix = generatePokemonMatrix(pokemons);
  return {
    ...state,
    gameState: {
      ...state.gameState,
      selectedPokemons: [],
      pokemons,
      matrix,
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
  const totalRow = 4;
  const totalCol = 8;
  const [selectedPokemon1, selectedPokemon2] = selectedPokemons;

  if (
    selectedPokemon1 &&
    selectedPokemon2 &&
    pokemons[selectedPokemon1.nid].id === pokemons[selectedPokemon2.nid].id
  ) {
    const { matched } = checkAvailableLine(
      selectedPokemon1,
      selectedPokemon2,
      matrix,
      totalRow,
      totalCol
    );

    if (matched) {
      pokemons[selectedPokemon1.nid].matched = true;
      pokemons[selectedPokemon2.nid].matched = true;
      matrix = generatePokemonMatrix(pokemons);
    } else {
      selectedPokemons.length = 0;
    }
  } else {
    if (selectedPokemons.length === 2) {
      selectedPokemons.length = 0;
    }
  }

  return {
    ...state,
    gameState: {
      running: true,
      pokemons,
      matrix,
      selectedPokemons,
    } as GameState,
  };
};
