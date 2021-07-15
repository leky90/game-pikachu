import { useContext, useEffect } from "react";
import AppContext, { AppStore, Page } from "../context/AppContext";
import { AppAction } from "../context/AppReducer";

export default function useAppContextActions() {
  const { state, dispatch } = useContext(AppContext);

  const navigate = (page: Page) => {
    dispatch({ type: AppAction.NAVIGATE_PAGE, payload: page });
  };

  const getState = (key: keyof AppStore) => state[key];

  const getGameState = () => {
    const matrix = state.gameState?.matrix ?? [];
    const pokemons = state.gameState?.pokemons ?? {};
    const selectedPokemons = state.gameState?.selectedPokemons ?? [];

    console.log("pokemons", pokemons);
    return {
      pokemonMatrix: matrix,
      pokemons,
      selectedPokemons,
    };
  };

  const checkGameRule = () => {
    dispatch({ type: AppAction.CHECK_RULE });
  };

  // useEffect(() => {
  //   checkGameRule();
  //   return () => {};
  // }, []);

  return {
    getState,
    dispatch,
    navigate,
    currentPage: state.page,
    getGameState,
    checkGameRule,
  };
}
