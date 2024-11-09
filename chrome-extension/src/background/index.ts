import 'webextension-polyfill';
import { algorithmHubThemeStorage } from '@extension/storage';

algorithmHubThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
