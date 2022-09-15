import axios from 'axios';
import React from 'react';
import CountryType from '../../../types/CountryType';
import SearchField from '../../../components/SearchField';
import RegionDropdown from '../../../components/RegionDropdown';
import FilteredCountries from '../../../components/FilteredCountries';
import { Filters } from '../../../components/StyledComponents';

type PropsType = {
  countries: CountryType[];
  region: string;
};

type ContextType = {
  params: {
    region: string;
  };
};

export async function getServerSideProps(context: ContextType) {
  const region = context.params.region;
  const res = await axios.get(
    `https://restcountries.com/v3.1/region/${region}`
  );
  const countries: CountryType[] = await res.data;
  return { props: { countries } };
}

export default function CountriesByRegion({ countries }: PropsType) {
  return (
    <main>
      <Filters>
        <SearchField />
        <RegionDropdown />
      </Filters>
      <FilteredCountries countries={countries} />
    </main>
  );
}
