import { createContext, useReducer } from 'react';

const initialState = {
  size: 32,
  birth: new Set([3]),
  survival: new Set([2, 3])
};

export const LifeSettingsContext = createContext({
  settings: initialState,
  updateSettings: () => {}
});

export const LifeSettingsProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        return {
          ...state,
          ...action.payload
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSettings = (settings) => {
    dispatch({ type: 'update', payload: settings });
  };

  return (
    <LifeSettingsContext.Provider value={{ settings: state, updateSettings }}>
      {children}
    </LifeSettingsContext.Provider>
  );
};
