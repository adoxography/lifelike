import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useLifeSettings } from '@/hooks';
import presets from '@/presets';
import { Card, ToggleGrid, Label, DelayedInput } from '..';

const LifeSettings = (props: any) => {
  const { settings, updateSettings } = useLifeSettings();
  const [toggleValues, setToggleValues] = useState<Set<number>[]>();

  useEffect(() => {
    setToggleValues([
      new Set([...settings.birth]),
      new Set([...settings.survival])
    ])
  }, [settings.birth, settings.survival]);

  const handlePresetSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const preset = presets.find(preset => preset.label === e.target.value);

    updateSettings(preset.settings);
  };

  const handleSizeChange = (size: number) => {
    updateSettings({ size });
  };

  const handleToggleChange = (values: Set<number>[]) => {
    updateSettings({
      birth: values[0],
      survival: values[1]
    });
  };

  const handleTrailChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSettings({ trail: Math.max(0, Math.min(1, parseFloat(e.target.value))) });
  };

  return (
    <Card {...props}>
      <div className="grid grid-cols-[max-content_1fr] gap-x-4 items-center">
        <Label
          className="mb-3"
          tooltip="Select a well-known setting"
        >
          Preset
        </Label>
        <div className="w-full relative mb-3">
          <select
            className="border-0 rounded-sm w-full bg-transparent focus:ring-sky-300/50"
            onChange={handlePresetSelected}
          >
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
            <Label tooltip="If a 'dead' cell has any of these numbers of neighbours, it will become alive in the next generation.">Birth</Label>,
            <Label tooltip="If an 'alive' cell has any of these numbers of neighbours, it will survive into the next generation.">Survival</Label>
          ]}
          values={toggleValues}
          onChange={handleToggleChange}
        />
        <Label
          className="mt-3"
          tooltip="The width and height of the grid"
        >
          Size
        </Label>
        <DelayedInput
          type="number"
          onChange={handleSizeChange}
          value={settings.size}
          className="bg-gradient-to-br from-slate-900 to-[#1a2234] rounded-sm border-0 mt-3 focus:ring-sky-300/50"
        />
        <Label
          className="mt-3"
          tooltip="The size of the trail following a cell"
        >
          Trail
        </Label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.trail}
          onChange={handleTrailChange}
          className="accent-sky-300"
        />
      </div>
    </Card>
  );
};

export default LifeSettings;
