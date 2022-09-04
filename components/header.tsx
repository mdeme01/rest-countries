import { Button } from '@mui/material';
import { useState } from 'react';
import { CustomHeader, ThemeButton } from './StyledComponents';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export default function Header() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <CustomHeader>
      <h1>Where in the world?</h1>
      <Button
        variant="text"
        startIcon={darkMode ? <DarkModeIcon /> : <DarkModeOutlinedIcon />}
        onClick={() => setDarkMode(!darkMode)}
      >
        Dark Mode
      </Button>
    </CustomHeader>
  );
}
