import { useImmer } from "use-immer";
import { useEffect, useRef } from "react";

export const useSyncedState = (initialState, syncCallback) => {
  const [state, setState] = useImmer(initialState);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      syncCallback(state);
    }
    didMountRef.current = true;
  }, [state, syncCallback]);

  return [state, setState];
};
