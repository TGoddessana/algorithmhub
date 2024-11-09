import '@src/Popup.css';
import '@src/legacy/popup.css';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'popup/icon-dark.png' : 'popup/icon-white.png';
  const goGithubSite = () => chrome.tabs.create({ url: 'https://github.com/TGoddessana/algorithmhub' });

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <div className={`text-5xl font-bold`}>
          <span className="text-[#7F27FF]">Algorithm</span>
          <button onClick={goGithubSite}>
            <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
          </button>
          <span className="text-[#AD49E1]">Hub</span>
        </div>

        <p className="text-base">
          Automatically upload your <br />
          algorithm-problem-solving history to GitHub. 🦾
        </p>
        <hr className="mt-1 w-full border-gray-300" />

        <PSPlatforms />
        <AuthenticateGithubButton />

        <hr className="my-4 w-full border-gray-300" />

        <div className="fixed bottom-4 flex w-full items-center justify-between px-4">
          <div className="flex-1">
            <ExtensionOnOffSwitch />
          </div>
          <div className="flex flex-1 justify-center">
            <FooterIcons />
          </div>
          <div className="flex flex-1 justify-end">
            <DarkmodeSwitch />
          </div>
        </div>
      </header>
    </div>
  );
};

const PSPlatforms = () => {
  const openLeetCode = () => chrome.tabs.create({ url: 'https://leetcode.com' });
  const openHackerRank = () => chrome.tabs.create({ url: 'https://www.hackerrank.com' });
  const openBaekJoon = () => chrome.tabs.create({ url: 'https://www.acmicpc.net' });
  const openProgrammers = () => chrome.tabs.create({ url: 'https://programmers.co.kr' });

  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  const buttonClass = `flex items-center justify-center text-xl rounded px-4 py-2 font-bold shadow hover:scale-105 ${
    isLight ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'
  }`;

  return (
    <div className="m-4 grid grid-cols-2 gap-4">
      <button className={buttonClass} onClick={openLeetCode}>
        LeetCode
      </button>
      <button className={buttonClass} onClick={openHackerRank}>
        HackerRank
      </button>
      <button className={buttonClass} onClick={openBaekJoon}>
        BaekJoon
      </button>
      <button className={buttonClass} onClick={openProgrammers}>
        Programmers
      </button>
    </div>
  );
};

const AuthenticateGithubButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const authenticate = () => chrome.runtime.sendMessage({ type: 'authenticate' });
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  return (
    <button
      className={`mt-1 rounded px-4 py-1 font-bold shadow hover:scale-105 ${isLight ? 'bg-black text-white' : 'bg-white text-black'}`}
      onClick={authenticate}>
      <p className="flex items-center text-base">
        <FontAwesomeIcon icon={faGithub} className={`text-3xl ${isLight ? 'text-white' : 'text-black'} mr-2`} />
        Authenticate with GitHub
      </p>
      {props.children}
    </button>
  );
};

const ExtensionOnOffSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    chrome.storage.local.get('algorithmHubEnabled', data => {
      setIsEnabled(data.algorithmHubEnabled ?? false);
    });
  }, []);

  const toggleExtension = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    chrome.storage.local
      .set({ algorithmHubEnabled: newValue })
      .then(() => console.log('algorithmHubEnabled', newValue));
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label htmlFor="extension-toggle" className="relative flex items-center">
      <div className="relative">
        <input
          id="extension-toggle"
          type="checkbox"
          className="sr-only"
          checked={isEnabled}
          onChange={toggleExtension}
        />
        <div
          className={`block h-10 w-20 rounded-full transition-colors ${isEnabled ? 'bg-green-500' : 'bg-gray-600'}`}></div>
        <div
          className={`absolute top-1 size-8 rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-11' : 'translate-x-1'
          }`}></div>
      </div>
    </label>
  );
};

const FooterIcons = () => {
  const goGithubSite = () => chrome.tabs.create({ url: 'https://githu b.com/TGoddessana/algorithmhub' });
  const sendEmail = () => (window.location.href = 'mailto:twicegoddessana1229@gmail.com');
  const openWelcomePage = () => chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });

  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  const buttonClass = `flex items-center h-10 justify-center rounded px-4 py-2 font-bold shadow hover:scale-105 ${
    isLight ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'
  }`;

  return (
    <div className="flex space-x-2">
      <button className={buttonClass} onClick={goGithubSite}>
        <FontAwesomeIcon icon={faGithub} className="text-2xl" />
      </button>
      <button className={buttonClass} onClick={sendEmail}>
        <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
      </button>
      <button className={buttonClass} onClick={openWelcomePage}>
        <FontAwesomeIcon icon={faHome} className="text-2xl" />
      </button>
    </div>
  );
};

const DarkmodeSwitch = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  return (
    <button
      className={`right-4 flex h-10 items-center justify-center rounded px-4 py-1 font-bold shadow hover:scale-105 ${isLight ? 'bg-gray-200 text-black' : 'bg-gray-700 text-white'}`}
      onClick={exampleThemeStorage.toggle}>
      <FontAwesomeIcon icon={isLight ? faMoon : faSun} className="text-2xl" />
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
