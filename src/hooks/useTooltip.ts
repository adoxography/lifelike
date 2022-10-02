import { useContext } from 'react';
import { TooltipContext } from '../contexts';

const useTooltip = () => useContext(TooltipContext);

export default useTooltip;
