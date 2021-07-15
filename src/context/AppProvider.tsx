import { FC, useReducer } from "react";
import AppContext, { initialState } from "./AppContext";
import AppReducer from "./AppReducer";

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
