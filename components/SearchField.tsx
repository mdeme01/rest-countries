import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
      <TextField
        placeholder="Search for a country..."
        defaultValue={query}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={(e) => search(e)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
