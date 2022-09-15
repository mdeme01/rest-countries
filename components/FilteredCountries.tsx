import React from 'react';
import CountryType from '../types/CountryType';
import Country from './Country';
import { CardGrid } from './StyledComponents';

export default function FilteredCountries({
  countries,
}: {
  countries: CountryType[];
}) {
  return (
    <CardGrid>
      {countries
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .map((country: CountryType) => {
          return (
            <React.Fragment key={country.cca2}>
              <Country data={country} />
            </React.Fragment>
          );
        })}
    </CardGrid>
  );
}
