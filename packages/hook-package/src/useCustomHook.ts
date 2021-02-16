import { useState } from 'react';

export const useCustomHook = () => {
  const [state, setState] = useState(0);
  return [state, () => setState(state + 1), () => setState(state - 1)] as const;
};
