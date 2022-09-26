import { createTheme } from '@mui/material/styles';

export const colors = {
  darkBlue: 'hsl(209, 23%, 22%)', // dark mode elements
  veryDarkBlueBG: 'hsl(207, 26%, 17%)', // dark mode background
  veryDarkBlueFG: 'hsl(200, 15%, 8%)', // light mode text
  darkGray: 'hsl(0, 0%, 52%)', // light mode input
  veryLightGray: 'hsl(0, 0%, 98%)', // light mode background
  white: 'hsl(0, 0%, 100%)', // dark mode text & light mode elements
};

export const lightTheme = createTheme({
  palette: {
    background: {
      default: colors.veryLightGray,
    },
    text: {
      primary: colors.veryDarkBlueFG,
      secondary: colors.darkGray,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    background: {
      default: colors.veryDarkBlueBG,
    },
    text: {
      primary: colors.white,
      secondary: colors.darkBlue,
    },
  },
});
