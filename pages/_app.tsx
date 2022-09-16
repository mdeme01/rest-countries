import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.scss';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { lightTheme, darkTheme } from '../utils/themes';
import CustomThemeProvider from '../components/CustomThemeProvider';

function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <CustomThemeProvider value={{ darkMode, changeTheme }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CustomThemeProvider>
  );
}

export default App;
