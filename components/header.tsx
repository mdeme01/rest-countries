import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { CustomHeader, ThemeButton } from './StyledComponents';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {
  CustomThemeContext,
  CustomThemeContextType,
} from './CustomThemeProvider';

export default function Header() {
  const Theme: CustomThemeContextType = useContext(
    CustomThemeContext
  ) as unknown as CustomThemeContextType;

  const saveTheme = () => {
    localStorage.setItem('theme', Theme.darkMode ? 'light' : 'dark');
    Theme.changeTheme();
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    theme === 'dark' ? Theme.changeTheme() : '';
  }, []);

  return (
    <CustomHeader>
      <h1>Where in the world?</h1>
      <Button
        variant="text"
        startIcon={Theme.darkMode ? <DarkModeIcon /> : <DarkModeOutlinedIcon />}
        onClick={() => saveTheme()}
      >
        Dark Mode
      </Button>
    </CustomHeader>
  );
}
