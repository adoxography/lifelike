import { createContext, useEffect, useState } from 'react';

const initialState = {
  isMouseDown: false,
  mouseX: 0,
  mouseY: 0
};

export const MouseStateContext = createContext(initialState);

export const MouseStateProvider = ({ children }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.pageX);
      setMouseY(event.pageY);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <MouseStateContext.Provider value={{ isMouseDown, mouseX, mouseY }}>
      {children}
    </MouseStateContext.Provider>
  );
};
