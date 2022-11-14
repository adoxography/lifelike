import type { PropsWithChildren } from 'react';
import { useCallback, useState, useEffect, createContext } from 'react';
import useLifeSettings from '@/hooks/useLifeSettings';
import State from '@/State';
import { emptyFunction } from '@/utils';

type LifeContextProps = {
  isSimulating: boolean;
  state?: State;
  toggleCell: (x: number, y: number) => void;
  start: () => void;
  stop: () => void;
  randomize: () => void;
  getValue: (x: number, y: number) => number;
  reset: () => void;
};

const initialState = {
  isSimulating: false,
  state: null,
  toggleCell: emptyFunction,
  start: emptyFunction,
  stop: emptyFunction,
  randomize: emptyFunction,
  getValue: (_x: number, _y: number) => 0,
  reset: emptyFunction
};

export const LifeContext = createContext<LifeContextProps>(initialState);

export const LifeProvider = ({ children }: PropsWithChildren) => {
  const { settings } = useLifeSettings();
  const [state, setState] = useState<State>();
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    setState(prevState =>
      prevState
        ? prevState.resize(settings.size)
        : State.randomize(settings.size)
    );
  }, [settings.size]);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setState(prevState => prevState.next(settings));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isSimulating, settings]);

  const start = useCallback(() => setIsSimulating(true), []);
  const stop = useCallback(() => setIsSimulating(false), []);
  const randomize = useCallback(
    () => setState(State.randomize(settings.size)),
    [settings.size]
  );
  const getValue = useCallback(
    (x: number, y: number) => state?.get(x, y),
    [state]
  );
  const reset = useCallback(
    () => setState(new State(settings.size)),
    [settings.size]
  );

  const toggleCell = (x: number, y: number) => {
    setState(prevState => prevState.toggleCell(x, y));
  };

  const value = {
    isSimulating,
    state,
    start,
    stop,
    toggleCell,
    randomize,
    getValue,
    reset
  };

  return (
    <LifeContext.Provider value={value}>
      {children}
    </LifeContext.Provider>
  );
};

export const LifeConsumer = LifeContext.Consumer;
