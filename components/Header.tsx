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
import { colors } from '../utils/themes';

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
    <CustomHeader
      style={{
        backgroundColor: Theme.darkMode ? colors.darkBlue : colors.white,
        boxShadow: Theme.darkMode
          ? `1px 1px 1px ${colors.veryDarkBlueBG}`
          : `1px 1px 1px ${colors.darkGray}`,
      }}
    >
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
        sx={{
          color: Theme.darkMode ? 'white' : 'black',
          textTransform: 'none',
          fontFamily: 'inherit',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Dark Mode
      </Button>
    </CustomHeader>
  );
}
