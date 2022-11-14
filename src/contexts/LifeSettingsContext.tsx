import type { PropsWithChildren } from 'react';
import { createContext, useReducer } from 'react';
import type { LifeConfiguration } from '@/types';
import { emptyFunction } from '@/utils';

enum ActionKind {
  Update = 'UPDATE'
}

export type LifeSettings = LifeConfiguration & {
  size: number;
  trail: number;
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
  trail: 0.75,
  birth: new Set([3]),
  survival: new Set([2, 3])
};

export const LifeSettingsContext = createContext<LifeSettingsContextValues>({
  settings: initialState,
  updateSettings: emptyFunction
});

export const LifeSettingsProvider = ({ children } : PropsWithChildren) => {
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
