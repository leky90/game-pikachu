import { createContext, Dispatch } from "react";
import { Action } from "./AppReducer";

export type Pokemon = {
  id: string;
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

export enum GameStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum Page {
  BOARD = "board",
  POKEMON = "pokemon",
}

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

export enum PointType {
  START = "start",
  END = "end",
  LINE = "line",
}

export type PointCoords = {
  rowIndex: number;
  colIndex: number;
  direction?: Direction;
  type?: PointType;
};

export type PokemonCoords = PointCoords & {
  nid?: string;
};

export type GameSettings = {
  name: Game | null;
  settings: {
    audio: boolean;
    timing: number;
    mode: GameMode;
    row: number;
    col: number;
  };
};

export type GameOptions = {
  [key in GameMode]: {
    row: number;
    col: number;
    timing: number;
  };
};

export type GameState = {
  selectedPokemons: PokemonCoords[];
  pokemons: Record<string, Pokemon>;
  matrix: Pokemon[][];
  running: boolean;
  connectingLinePoints: PointCoords[];
  status: GameStatus;
};

export interface AppStore {
  page: Page;
  gameSettings: GameSettings;
  gameState: GameState;
}

export const gameOptions: GameOptions = {
  [GameMode.NORMAL]: {
    row: 8,
    col: 10,
    timing: 1200,
  },
  [GameMode.EASY]: {
    row: 6,
    col: 8,
    timing: 1800,
  },
  [GameMode.HARD]: {
    row: 10,
    col: 12,
    timing: 600,
  },
};

export const initialGameSettings: GameSettings = {
  name: null,
  settings: {
    audio: true,
    timing: 0,
    mode: GameMode.NORMAL,
    row: gameOptions[GameMode.NORMAL].row,
    col: gameOptions[GameMode.NORMAL].col,
  },
};

export const initialGameState: GameState = {
  selectedPokemons: [],
  connectingLinePoints: [],
  pokemons: {},
  matrix: [],
  running: false,
  status: GameStatus.PENDING,
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
