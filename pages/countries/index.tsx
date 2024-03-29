import React from 'react';
import CountryType from '../../types/CountryType';
import axios from 'axios';
import SearchField from '../../components/SearchField';
import RegionDropdown from '../../components/RegionDropdown';
import FilteredCountries from '../../components/FilteredCountries';
import { MainContainer } from '../../components/StyledComponents';

type PropsType = {
  countries: CountryType[];
};

export async function getServerSideProps() {
  const res = await axios.get('https://restcountries.com/v3.1/all');
  const countries: CountryType[] = await res.data;
  return { props: { countries } };
}

export default function Countries({ countries }: PropsType) {
  return (
    <MainContainer>
      <SearchField />
      <RegionDropdown />
      <FilteredCountries countries={countries} />
    </MainContainer>
  );
}
