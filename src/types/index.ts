export type LifeConfiguration = {
  birth: Set<number>;
  survival: Set<number>
};

export type Preset = {
  label: string;
  settings: LifeConfiguration;
};
