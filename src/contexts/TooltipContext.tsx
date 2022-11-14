import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';
import { Tooltip } from '@/components';
import { emptyFunction } from '@/utils';

type TooltipState = {
  show: (_?: string) => void;
  hide: (_?: string) => void;
};

const initialValue = {
  show: emptyFunction,
  hide: emptyFunction
};

export const TooltipContext = createContext<TooltipState>(initialValue);

export const TooltipProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string | null>(null);

  const show = (message?: string) => {
    if (message !== null && message !== undefined) {
      setMessage(message);
    }
  };

  const hide = (msg?: string) => {
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
