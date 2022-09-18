import { initStore } from "./store";

export const configureStore = () => {
  const actions = {
    TOGGLE_AUTH: (state: any) => { return { auth: !state.auth } }
  }
  initStore(actions, { auth: false });
};
