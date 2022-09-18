import React, { useState } from "react"

export const AuthContext = React.createContext({
  auth: false,
  setAuth: (authFoo: (auth: boolean) => boolean) => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactElement }> = (props) => {
  const [auth, setAuth] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
