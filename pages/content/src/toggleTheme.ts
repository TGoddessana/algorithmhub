import { algorithmHubThemeStorage } from '@extension/storage';

export async function toggleTheme() {
  console.log('initial theme:', await algorithmHubThemeStorage.get());
  await algorithmHubThemeStorage.toggle();
  console.log('toggled theme:', await algorithmHubThemeStorage.get());
}
