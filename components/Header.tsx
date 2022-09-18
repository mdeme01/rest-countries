import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { CustomHeader } from './StyledComponents';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {
  CustomThemeContext,
  CustomThemeContextType,
} from './CustomThemeProvider';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

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
    // an empty depedency array is required, otherwise there will be an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomHeader>
      <h1
        style={{ cursor: 'pointer' }}
        onClick={() => router.push('/countries')}
      >
        Where in the world?
      </h1>
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
