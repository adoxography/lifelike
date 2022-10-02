import { useContext } from 'react';
import { MouseStateContext } from '../contexts';

const useMouseState = () => useContext(MouseStateContext);

export default useMouseState;
