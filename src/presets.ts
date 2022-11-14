import { Preset } from './types';

const presets: Array<Preset> = [
  {
    label: 'Classic',
    settings: {
      birth: new Set([3]),
      survival: new Set([2, 3])
    }
  },
  {
    label: 'Seeds',
    settings: {
      birth: new Set([2]),
      survival: new Set<number>([])
    }
  },
  {
    label: 'Replicator',
    settings: {
      birth: new Set([1, 3, 5, 7]),
      survival: new Set([1, 3, 5, 7])
    }
  },
  {
    label: 'Life without Death',
    settings: {
      birth: new Set([3]),
      survival: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8])
    }
  },
  {
    label: '34 Life',
    settings: {
      birth: new Set([3, 4]),
      survival: new Set([3, 4])
    }
  },
  {
    label: 'Diamoeba',
    settings: {
      birth: new Set([3, 5, 6, 7, 8]),
      survival: new Set([5, 6, 7, 8])
    }
  },
  {
    label: '2x2',
    settings: {
      birth: new Set([3, 6]),
      survival: new Set([1, 2, 5])
    }
  },
  {
    label: 'HighLife',
    settings: {
      birth: new Set([3, 6]),
      survival: new Set([2, 3])
    }
  },
  {
    label: 'Day & Night',
    settings: {
      birth: new Set([3, 6, 7, 8]),
      survival: new Set([3, 4, 6, 7, 8])
    }
  },
  {
    label: 'Morley',
    settings: {
      birth: new Set([3, 6, 8]),
      survival: new Set([2, 4, 5])
    }
  },
  {
    label: 'Anneal',
    settings: {
      birth: new Set([4, 6, 7, 8]),
      survival: new Set([3, 5, 6, 7, 8])
    }
  }
];

export default presets;
