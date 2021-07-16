import { useContext } from "react";
import AppContext, { AppStore, Page } from "../context/AppContext";
import { AppAction } from "../context/AppReducer";

export default function useAppContextActions() {
  const { state, dispatch } = useContext(AppContext);

  const navigate = (page: Page) => {
    dispatch({ type: AppAction.NAVIGATE_PAGE, payload: page });
  };

  const getState = (key: keyof AppStore) => state[key];

  const getGameState = () => {
    return { ...state.gameState };
  };

  const getGameSettings = () => {
    return { ...state.gameSettings };
  };

  return {
    getState,
    dispatch,
    navigate,
    currentPage: state.page,
    getGameState,
    getGameSettings,
  };
}
