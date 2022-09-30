import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, InputAdornment, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CustomInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.backgroundColor.main,
  // boxShadow: `1px 1px 1px 2px ${theme.boxShadowColor.main}, -1px -1px 1px 2px ${theme.boxShadowColor.main}`,
  borderRadius: '5px',
  padding: '10px',
}));

export default function SearchField() {
  const router = useRouter();
  const [query, setQuery] = useState<string>(
    (router.query.name as string) ?? ''
  );

  const search = (e: FormEvent) => {
    e.preventDefault();
    const url = query === '' ? '/countries' : `/countries/name/${query}`;
    router.push(url);
  };

  return (
    <form onSubmit={(e) => search(e)}>
      <CustomInput
        placeholder="Search for a country..."
        defaultValue={query}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={(e) => search(e)}>
                <SearchIcon color="primary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
