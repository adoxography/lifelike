import { useMemo } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { Config } from 'tailwindcss';
import tailwindConfig from 'tailwind.config.cjs';

const useTailwind = () => {
  const config = useMemo<Config>(() => resolveConfig(tailwindConfig), []);

  return config;
};

export default useTailwind;
