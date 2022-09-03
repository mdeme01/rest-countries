import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import Country from '../../../components/Country';
import CountryType from '../../../types/CountryType';
import styles from '../../../styles/Home.module.scss';
import { useRouter } from 'next/router';
import { CardGrid } from '../../../components/StyledComponents';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';

type PropsType = {
  countries: CountryType[];
  name: string;
};

type ContextType = {
  params: {
    name: string;
  };
};

export async function getServerSideProps(context: ContextType) {
  const name = context.params.name;
  const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
  const countries: CountryType[] = await res.data;
  return { props: { countries, name } };
}

export default function CountriesByName({ countries, name }: PropsType) {
  const router = useRouter();

  const [query, setQuery] = useState<string>('');

  const filterRegion = (region: string) => {
    const url =
      region === 'None' ? '/countries' : `/countries/region/${region}`;
    router.push(url);
  };

  const search = (e: FormEvent) => {
    e.preventDefault();
    const url = query === '' ? '/countries' : `/countries/name/${query}`;
    router.push(url);
  };

  return (
    <main>
      <div className={styles.filters}>
        <form onSubmit={(e) => search(e)}>
          <TextField
            placeholder="Search for a country..."
            defaultValue={name ?? ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon onClick={(e) => search(e)} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <div className={styles.dropdown}>
          <span>Filter by region: {'None'}</span>
          <div className={styles.dropdownContent}>
            <div onClick={() => filterRegion('Africa')}>Africa</div>
            <div onClick={() => filterRegion('America')}>America</div>
            <div onClick={() => filterRegion('Europe')}>Europe</div>
            <div onClick={() => filterRegion('Asia')}>Asia</div>
            <div onClick={() => filterRegion('Oceania')}>Oceania</div>
            <div onClick={() => filterRegion('None')}>None</div>
          </div>
        </div>
      </div>
      <CardGrid>
        {countries
          .sort((a, b) => a.name.official.localeCompare(b.name.official))
          .map((country: CountryType) => {
            return (
              <React.Fragment key={country.cca2}>
                <Country data={country} />
              </React.Fragment>
            );
          })}
      </CardGrid>
    </main>
  );
}
