import { createContext, Dispatch } from "react";
import { Action } from "./AppReducer";

export type Pokemon = {
  id: string;
  color: string;
  matched: boolean;
  nid?: string;
  image?: string;
};

export enum Game {
  POKEMON = "pokemon",
}

export enum GameMode {
  HARD = "hard",
  NORMAL = "normal",
  EASY = "easy",
}

export enum Page {
  BOARD = "board",
  POKEMON = "pokemon",
}

export type PointCoords = {
  rowIndex: number;
  colIndex: number;
};

export type PokemonCoords = PointCoords & {
  nid: string;
};

export type GameSettings = {
  name: Game | null;
  settings: {
    audio: boolean;
    timing: boolean;
    mode: GameMode;
    row: number;
    col: number;
  };
};

export type GameOptions = {
  [key in GameMode]: {
    row: number;
    col: number;
  };
};

export type GameState = {
  selectedPokemons: PokemonCoords[];
  pokemons: Record<string, Pokemon>;
  matrix: Pokemon[][];
  running: boolean;
};

export interface AppStore {
  page: Page;
  gameSettings: GameSettings;
  gameState: GameState;
}

export const gameOptions: GameOptions = {
  [GameMode.NORMAL]: {
    row: 4,
    col: 8,
  },
  [GameMode.EASY]: {
    row: 3,
    col: 6,
  },
  [GameMode.HARD]: {
    row: 8,
    col: 12,
  },
};

export const initialGameSettings: GameSettings = {
  name: null,
  settings: {
    audio: true,
    timing: false,
    mode: GameMode.NORMAL,
    row: gameOptions[GameMode.NORMAL].row,
    col: gameOptions[GameMode.NORMAL].col,
  },
};

export const initialGameState: GameState = {
  selectedPokemons: [],
  pokemons: {},
  matrix: [],
  running: false,
};

export const initialState: AppStore = {
  page: Page.BOARD,
  gameSettings: initialGameSettings,
  gameState: initialGameState,
};

const AppContext = createContext<{
  state: AppStore;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default AppContext;
