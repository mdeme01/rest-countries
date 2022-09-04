import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.scss';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import { CustomHeader } from '../components/StyledComponents';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../utils/themes';

function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    theme === 'dark' ? setDarkMode(true) : setDarkMode(false);
  }, []);

  const saveTheme = () => {
    const theme = darkMode ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Layout>
        <CustomHeader>
          <h1>Where in the world?</h1>
          <Button
            variant="text"
            startIcon={darkMode ? <DarkModeIcon /> : <DarkModeOutlinedIcon />}
            onClick={() => saveTheme()}
          >
            Dark Mode
          </Button>
        </CustomHeader>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
