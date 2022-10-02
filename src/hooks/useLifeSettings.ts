import { useContext } from 'react';
import { LifeSettingsContext } from '@/contexts';

const useLifeSettings = () => useContext(LifeSettingsContext);

export default useLifeSettings;
