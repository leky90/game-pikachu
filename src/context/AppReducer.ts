import { AppStore } from "./AppContext";
import {
  changeGameModeReducer,
  exitGameReducer,
  replayGameReducer,
  rotatePokemonsReducer,
  selectPokemonCardReducer,
  setGameReducer,
  startGameReducer,
} from "../reducers/PokemonReducer";

export enum AppAction {
  NAVIGATE_PAGE = "navigate_page",
  START_GAME = "start_game",
  SET_GAME = "set_game",
  RESET_GAME = "reset_game",
  SELECT_POKEMON = "select_pokemon",
  CHECK_RULE = "check_rule",
  ROTATE_POKEMONS = "rotate_pokemons",
  REPLAY_GAME = "replay_game",
  EXIT_GAME = "exit_game",
  CHANGE_GAME_MODE = "change_game_mode",
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
    case AppAction.SET_GAME:
      return setGameReducer(state, action.payload);
    case AppAction.START_GAME:
      return startGameReducer(state);
    case AppAction.REPLAY_GAME:
      return replayGameReducer(state);
    case AppAction.EXIT_GAME:
      return exitGameReducer(state);
    case AppAction.ROTATE_POKEMONS:
      return rotatePokemonsReducer(state);
    case AppAction.SELECT_POKEMON:
      return selectPokemonCardReducer(state, action.payload);
    case AppAction.CHANGE_GAME_MODE:
      return changeGameModeReducer(state);
    default:
      throw new Error();
  }
}
