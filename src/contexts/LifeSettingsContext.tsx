import { createContext, useReducer } from 'react';
import type { LifeConfiguration } from '@/types';

enum ActionKind {
  Update = 'UPDATE'
};

export type LifeSettings = LifeConfiguration & {
  size: number;
};

type LifeSettingsContextValues = {
  settings: LifeSettings;
  updateSettings: (_: Partial<LifeSettings>) => void;
};

type Action = {
  type: ActionKind;
  payload: Partial<LifeSettings>;
};

const initialState = {
  size: 32,
  birth: new Set([3]),
  survival: new Set([2, 3])
};

export const LifeSettingsContext = createContext<LifeSettingsContextValues>({
  settings: initialState,
  updateSettings: () => {}
});

export const LifeSettingsProvider = ({ children }) => {
  const reducer = (state: LifeSettings, action: Action) => {
    switch (action.type) {
      case ActionKind.Update:
        return {
          ...state,
          ...action.payload
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSettings = (settings: Partial<LifeSettings>) => {
    dispatch({ type: ActionKind.Update, payload: settings });
  };

  const value = {
    settings: state,
    updateSettings 
  };

  return (
    <LifeSettingsContext.Provider value={value}>
      {children}
    </LifeSettingsContext.Provider>
  );
};
