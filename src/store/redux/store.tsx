import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

const authSlice = createSlice({
  name: 'authentication',
  initialState: { auth: false },
  reducers: {
    toggle: (state) => { state.auth = !state.auth },
    set: (state, action) => { state.auth = action.payload.auth },
  }
});
export const { toggle, set } = authSlice.actions;

const store = configureStore({
  reducer: {
    authentication: authSlice.reducer
  }
});
export type StoreState = ReturnType<typeof store.getState>;

const AuthReduxProvider: React.FC<{ children: React.ReactElement }> = (props) => (
  <Provider store={store}>{props.children}</Provider>
);
export default AuthReduxProvider;
