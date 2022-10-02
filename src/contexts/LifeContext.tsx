import { useState, useEffect, createContext } from 'react';
import useLifeSettings from '@/hooks/useLifeSettings';
import State from '@/State';

const initialState = {
  isSimulating: false,
  state: null,
  toggleCell: (_x: number, _y: number) => {},
  start: () => {},
  stop: () => {},
  randomize: () => {},
  getValue: (_x: number, _y: number) => {},
  reset: () => {}
};

export const LifeContext = createContext(initialState);

export const LifeProvider = ({ children }) => {
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

  const start = () => setIsSimulating(true);
  const stop = () => setIsSimulating(false);
  const randomize = () => setState(State.randomize(settings.size));
  const getValue = (x: number, y: number) => state?.get(x, y);
  const reset = () => setState(new State(settings.size));

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
