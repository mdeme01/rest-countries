import { createTheme } from '@mui/material/styles';

const darkBlue: string = 'hsl(209, 23%, 22%)'; // dark mode elements
const veryDarkBlueBG: string = 'hsl(207, 26%, 17%)'; // dark mode background
const veryDarkBlueFG: string = 'hsl(200, 15%, 8%)'; // light mode text
const darkGray = 'hsl(0, 0%, 52%)'; // light mode input
const veryLightGray = 'hsl(0, 0%, 98%)'; // light mode background
const white = 'hsl(0, 0%, 100%)'; // dark mode text & light mode elements

export const lightTheme = createTheme({
  palette: {
    background: {
      default: veryLightGray,
    },
    text: {
      primary: veryDarkBlueFG,
      secondary: darkGray,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    background: {
      default: veryDarkBlueBG,
      paper: veryDarkBlueBG,
    },
    text: {
      primary: white,
      secondary: darkBlue,
    },
  },
});
