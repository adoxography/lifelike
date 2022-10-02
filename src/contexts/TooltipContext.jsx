import { createContext, useState } from 'react';
import { Tooltip } from '../components';

const initialValue = {
  show: () => {},
  hide: () => {}
};

export const TooltipContext = createContext(initialValue);

export const TooltipProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const show = (message) => {
    if (message !== null && message !== undefined) {
      setMessage(message);
    }
  };

  const hide = (msg) => {
    if (msg === message) {
      setMessage(null);
    }
  };

  const value = {
    show,
    hide
  };

  return (
    <TooltipContext.Provider value={value}>
      {children}
      <Tooltip
        message={message}
        open={message !== null}
      />
    </TooltipContext.Provider>
  );
};
