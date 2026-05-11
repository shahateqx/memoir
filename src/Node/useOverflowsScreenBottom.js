import { useState, useEffect } from "react";

export const useOverflowsScreenBottom = (ref) => {
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      const { innerHeight } = window;
      setOverflows(bottom > innerHeight);
    }
  }, [ref]);

  return overflows;
};
