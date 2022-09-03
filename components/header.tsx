import { useState } from 'react';
import { CustomHeader, ThemeButton } from './StyledComponents';

export default function Header() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <CustomHeader>
      <h1>Where in the world?</h1>
      <ThemeButton onClick={() => setDarkMode(!darkMode)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
          height="20px"
          width="20px"
        >
          <title>Moon</title>
          <path
            d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
            fill={darkMode ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
        <div>Dark Mode</div>
      </ThemeButton>
    </CustomHeader>
  );
}
