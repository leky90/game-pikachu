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

export enum Page {
  BOARD = "board",
  POKEMON = "pokemon",
}

export type GameSettings = {
  name: Game;
  settings?: {};
};

export type PointCoords = {
  rowIndex: number;
  colIndex: number;
};

export type PokemonCoords = PointCoords & {
  nid: string;
};

export type GameState = {
  selectedPokemons: PokemonCoords[];
  pokemons: Record<string, Pokemon>;
  matrix: Pokemon[][];
};

export interface AppStore {
  page: Page;
  gameSettings?: GameSettings;
  gameState?: GameState;
}

export const initialState: AppStore = {
  page: Page.BOARD,
  gameSettings: undefined,
  gameState: undefined,
};

const AppContext = createContext<{
  state: AppStore;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default AppContext;
