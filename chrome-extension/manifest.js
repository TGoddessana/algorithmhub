import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: 'AlgorithmHub',
  version: packageJson.version,
  description: 'Automatically upload your algorithm-problem-solving history to GitHub. 🦾',
  host_permissions: ['<all_urls>'],
  permissions: ['storage', 'scripting', 'tabs', 'notifications'],
  options_page: 'options/index.html',
  background: {
    service_worker: 'background.iife.js',
    type: 'module',
  },
  action: {
    default_popup: 'popup/index.html',
    default_icon: 'icon-dark.png',
  },
  icons: {
    128: 'icon-dark.png',
  },
  content_scripts: [
    {
      matches: ['https://*/*', '<all_urls>'],
      js: ['content/index.iife.js'],
    },
    {
      matches: ['https://*/*', '<all_urls>'],
      js: ['content-ui/index.iife.js'],
    },
    {
      matches: ['https://*/*', '<all_urls>'],
      css: ['content.css'],
    },
  ],
  devtools_page: 'devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'icon-dark.png', 'icon-dark.png'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
