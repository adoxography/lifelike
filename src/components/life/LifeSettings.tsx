import type { ChangeEvent } from 'react';
import type { CardProps } from '../Card';
import type { LifeConfiguration } from '@/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLifeSettings } from '@/hooks';
import { setsEqual } from '@/utils';
import presets from '@/presets';
import { Card, ToggleGrid, Label, DelayedInput, Slider } from '..';

const presetMatchesSetting = (preset: LifeConfiguration, setting: LifeConfiguration): boolean => {
  return setsEqual(preset.birth, setting.birth) && setsEqual(preset.survival, setting.survival);
};

const LifeSettings = (props: CardProps) => {
  const { settings, updateSettings } = useLifeSettings();
  const [toggleValues, setToggleValues] = useState<Set<number>[]>();

  const selectedPreset = useMemo(() => {
    const selected = presets.find(preset => presetMatchesSetting(preset.settings, settings));

    if (selected) {
      return selected.label;
    }

    return 'Custom';
  }, [settings]);

  useEffect(() => {
    setToggleValues([
      new Set([...settings.birth]),
      new Set([...settings.survival])
    ]);
  }, [settings.birth, settings.survival]);

  const handlePresetSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const preset = presets.find(preset => preset.label === e.target.value);

    updateSettings(preset.settings);
  };

  const handleSizeChange = (size: number) => {
    updateSettings({ size });
  };

  const handleToggleChange = useCallback((values: Set<number>[]) => {
    updateSettings({
      birth: values[0],
      survival: values[1]
    });
  }, [updateSettings]);

  const handleTrailChange = useCallback((value: number) => {
    updateSettings({ trail: Math.max(0, Math.min(1, value)) });
  }, [updateSettings]);

  return (
    <Card {...props}>
      <div className="grid grid-cols-[max-content_1fr] gap-x-4 items-center">
        <Label
          id="preset-label"
          className="mb-3"
          tooltip="Select a well-known setting"
        >
          Preset
        </Label>
        <div className="w-full relative mb-3">
          <select
            className="border-0 rounded-sm w-full bg-transparent focus:ring-sky-300/50"
            aria-labelledby="preset-label"
            value={selectedPreset}
            onChange={handlePresetSelected}
          >
            {selectedPreset === 'Custom' && (<option className="bg-slate-900">
              Custom
            </option>)}
            {presets.map((preset) => (
              <option key={preset.label} className="bg-slate-900">
                {preset.label}
              </option>
            ))}
          </select>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 to-[#1a2234] -z-10" />
        </div>
        <ToggleGrid
          className="col-span-2 rounded-sm"
          labels={[
            <Label key={0} tooltip="If a 'dead' cell has any of these numbers of neighbours, it will become alive in the next generation.">Birth</Label>,
            <Label key={1} tooltip="If an 'alive' cell has any of these numbers of neighbours, it will survive into the next generation.">Survival</Label>
          ]}
          values={toggleValues}
          onChange={handleToggleChange}
        />
        <Label
          id="size-label"
          className="mt-3"
          tooltip="The width and height of the grid"
        >
          Size
        </Label>
        <DelayedInput
          type="number"
          aria-labelledby="size-label"
          onChange={handleSizeChange}
          value={settings.size}
          className="bg-gradient-to-br from-slate-900 to-[#1a2234] rounded-sm border-0 mt-3 focus:ring-sky-300/50"
        />
        <Label
          className="mt-3"
          tooltip="The size of the trail following a cell"
          id="trail-label"
        >
          Trail
        </Label>
        <Slider
          aria-labelledby="trail-label"
          min={0}
          max={1}
          value={settings.trail}
          onChange={handleTrailChange}
          thumbProps={{ 'aria-labelledby': 'trail-label' }}
        />
      </div>
    </Card>
  );
};

export default LifeSettings;
