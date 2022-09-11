import { createContext } from 'react';

export type CustomThemeContextType = {
  darkMode: boolean;
  changeTheme: () => void;
};

export const CustomThemeContext = createContext({});

export default function CustomThemeProvider({ children, value }) {
  return (
    <CustomThemeContext.Provider value={value}>
      {children}
    </CustomThemeContext.Provider>
  );
}
