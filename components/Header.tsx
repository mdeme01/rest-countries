import { useRouter } from 'next/router';
import { Button, styled } from '@mui/material';
import { useContext, useEffect } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {
  CustomThemeContext,
  CustomThemeContextType,
} from './CustomThemeProvider';

export const CustomHeader = styled('header')(({ theme }) => ({
  backgroundColor: theme.backgroundColor.main,
  boxShadow: `1px 1px 1px ${theme.boxShadowColor.main}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '50px',
  padding: '20px 80px',
  width: '100%',
  fontSize: '0.9rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.5rem',
    padding: '20px 10px',
  },
}));

export const Title = styled('h1')({
  cursor: 'pointer',
});

export const StyleButton = styled(Button)(({ theme }) => ({
  color: 'primary',
  textTransform: 'none',
  fontFamily: 'inherit',
  fontWeight: 'bold',
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

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
      <Title onClick={() => router.push('/countries')}>
        Where in the world?
      </Title>
      <StyleButton
        variant="text"
        startIcon={Theme.darkMode ? <DarkModeIcon /> : <DarkModeOutlinedIcon />}
        onClick={() => saveTheme()}
      >
        Dark Mode
      </StyleButton>
    </CustomHeader>
  );
}
