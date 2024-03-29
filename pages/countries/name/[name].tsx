import axios from 'axios';
import React from 'react';
import CountryType from '../../../types/CountryType';
import SearchField from '../../../components/SearchField';
import RegionDropdown from '../../../components/RegionDropdown';
import FilteredCountries from '../../../components/FilteredCountries';
import { MainContainer } from '../../../components/StyledComponents';

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
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const countries: CountryType[] = await res.data;
    return { props: { countries } };
  } catch {
    return { props: { countries: [] } };
  }
}

export default function CountriesByName({ countries }: PropsType) {
  return (
    <MainContainer>
      <SearchField />
      <RegionDropdown />
      <FilteredCountries countries={countries} />
    </MainContainer>
  );
}
