import { useEffect, useState } from "react";

let state: any = {};
let listeners: any[] = [];
let actions: any = {};

export const useStore = () => {
  const [, setState] = useState<any>(state);

  const dispatch = (action: string) => {
    const newState = actions[action](state); 
    state = { ...state, ...newState };
    listeners.forEach(listener => listener(state));
  };

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter(l => l !== setState);
    }
  }, [])
  return [state, dispatch];
}

export const initStore = (userActions: any, initialState: any) => {
  if (initialState) {
    state = { ...state, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
