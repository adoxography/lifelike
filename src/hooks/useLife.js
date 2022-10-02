import { useContext } from 'react';
import { LifeContext } from '../contexts';

const useLife = () => useContext(LifeContext);

export default useLife;
