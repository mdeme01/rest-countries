import React, { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  CustomThemeContext,
  CustomThemeContextType,
} from './CustomThemeProvider';
import { colors } from '../utils/themes';

export default function SearchField() {
  const router = useRouter();
  const [query, setQuery] = useState<string>(
    (router.query.name as string) ?? ''
  );

  const Theme: CustomThemeContextType = useContext(
    CustomThemeContext
  ) as unknown as CustomThemeContextType;

  const search = (e: FormEvent) => {
    e.preventDefault();
    const url = query === '' ? '/countries' : `/countries/name/${query}`;
    router.push(url);
  };

  return (
    <form onSubmit={(e) => search(e)}>
      <TextField
        placeholder="Search for a country..."
        defaultValue={query}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={(e) => search(e)}>
                <SearchIcon
                  sx={{
                    color: Theme.darkMode ? 'white' : 'black',
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          color: Theme.darkMode ? 'white' : 'black',
          backgroundColor: Theme.darkMode ? colors.darkBlue : colors.white,
          // boxShadow: Theme.darkMode
          //   ? `1px 1px 1px ${colors.veryDarkBlueBG}`
          //   : `1px 1px 1px ${colors.darkGray}`,
          borderRadius: '10px',
        }}
      />
    </form>
  );
}
