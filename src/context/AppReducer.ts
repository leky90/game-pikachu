import { AppStore, GameState } from "./AppContext";
import {
  checkAvailableLine,
  generatePokemonMatrix,
  makeListPokemons,
} from "../utils/GamePokemonHelpers";

export enum AppAction {
  NAVIGATE_PAGE = "navigate_page",
  SET_GAME = "set_game",
  RESET_GAME = "reset_game",
  SELECT_POKEMON = "select_pokemon",
  CHECK_RULE = "check_rule",
  ROTATE_POKEMONS = "rotate_pokemons",
  REPLAY_GAME = "replay_game",
}

export interface Action {
  type: AppAction;
  payload?: any;
}

export default function AppReducer(
  state: AppStore,
  action: Action | undefined
) {
  switch (action?.type) {
    case AppAction.NAVIGATE_PAGE: {
      return { ...state, page: action.payload };
    }
    case AppAction.SET_GAME: {
      const pokemons = makeListPokemons();
      const matrix = generatePokemonMatrix(pokemons);
      return {
        ...state,
        gameSettings: {
          ...action.payload,
        },
        gameState: {
          selectedPokemons: [],
          pokemons,
          matrix,
        },
      };
    }
    case AppAction.REPLAY_GAME: {
      const pokemons = makeListPokemons();
      const matrix = generatePokemonMatrix(pokemons);
      console.log("reducer", pokemons);
      return {
        ...state,
        gameSettings: {
          ...action.payload,
        },
        gameState: {
          selectedPokemons: [],
          pokemons,
          matrix,
        },
      };
    }
    case AppAction.ROTATE_POKEMONS: {
      const pokemons = makeListPokemons();
      const matrix = generatePokemonMatrix(pokemons);
      return {
        ...state,
        gameSettings: {
          ...action.payload,
        },
        gameState: {
          selectedPokemons: [],
          pokemons,
          matrix,
        },
      };
    }
    // case AppAction.CHECK_RULE: {
    //   const pokemons = state.gameState?.pokemons
    //     ? { ...state.gameState?.pokemons }
    //     : {};
    //   const selectedPokemons = state.gameState?.selectedPokemons
    //     ? [...state.gameState?.selectedPokemons]
    //     : [];
    //   const [nid1, nid2] = selectedPokemons;

    //   if (nid1 && nid2 && pokemons[nid1].id === pokemons[nid2].id) {
    //     pokemons[nid1].matched = true;
    //     pokemons[nid2].matched = true;
    //   }

    //   return {
    //     ...state,
    //     gameState: { ...state.gameState, selectedPokemons } as GameState,
    //   };
    // }
    case AppAction.SELECT_POKEMON: {
      let matrix = state.gameState?.matrix ? [...state.gameState?.matrix] : [];
      const selectedPokemons = state.gameState?.selectedPokemons
        ? [...state.gameState?.selectedPokemons]
        : [];

      if (selectedPokemons.length >= 2) {
        selectedPokemons.length = 0;
      }

      selectedPokemons.push(action.payload);

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
          ...state.gameState,
          matrix,
          selectedPokemons,
        } as GameState,
      };
    }
    default:
      throw new Error();
  }
}
