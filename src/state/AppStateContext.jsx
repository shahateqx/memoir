import { createContext, useContext } from "react";
import { usePageState } from "./usePageState";
import { withInitialState } from "./withInitialState";

const AppStateContext = createContext(null);

export const AppStateProvider = withInitialState(({ children, initialState }) => {
  const pageStateHandlers = usePageState(initialState);

  return (
    <AppStateContext.Provider value={pageStateHandlers}>
      {children}
    </AppStateContext.Provider>
  );
});

export const useAppState = () => useContext(AppStateContext);
