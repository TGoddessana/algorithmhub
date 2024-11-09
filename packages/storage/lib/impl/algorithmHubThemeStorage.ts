import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type Theme = 'light' | 'dark';

type ThemeStorage = BaseStorage<Theme> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<Theme>('algorithmHubTheme', 'light', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const algorithmHubThemeStorage: ThemeStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentTheme => {
      return currentTheme === 'light' ? 'dark' : 'light';
    });
  },
};