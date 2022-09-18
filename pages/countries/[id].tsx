import Image from 'next/image';
import { useRouter } from 'next/router';
import CountryType from '../../types/CountryType';
import axios from 'axios';
import React from 'react';

type PropsType = {
  country: CountryType;
  borderCountries: CountryType[];
};

type ContextType = {
  params: {
    id: string;
  };
};

export async function getServerSideProps(context: ContextType) {
  const res = await axios.get(
    `https://restcountries.com/v3.1/alpha/${context.params.id}`
  );
  const data: CountryType[] = await res.data;
  const country: CountryType = data[0];

  const borderCountries: CountryType[] = [];

  if (country.borders !== undefined) {
    await Promise.all(
      country.borders.map(async (code) => {
        await axios
          .get(`https://restcountries.com/v3.1/alpha/${code}`)
          .then((res) => {
            const data: CountryType[] = res.data;
            borderCountries.push(data[0]);
          });
      })
    );
  }

  return { props: { country, borderCountries } };
}

export default function CountryDetails({
  country,
  borderCountries,
}: PropsType) {
  const router = useRouter();

  return (
    <main>
      <Image width="300" height="150" src={country.flags.png} alt="flag" />
      <h2>{country.name.common}</h2>
      <div>
        Native Name:{' '}
        {!country.name.nativeName
          ? country.name.common
          : Object.values(country.name.nativeName).reverse()[0].common}
      </div>
      <div>Population: {country.population ?? '-'}</div>
      <div>Region: {country.region ?? '-'}</div>
      <div>Sub Region: {country.subregion ?? '-'}</div>
      <div>Capital: {country.capital ?? '-'}</div>
      <div>
        Top Level Domain:{' '}
        {!country.tld ? country.tld[0] : `.${country.cca2.toLowerCase()}`}
      </div>
      <div>
        Currencies:{' '}
        {!country.currencies
          ? 'None'
          : Object.values(country.currencies)
              .sort()
              .map((currency, i) => {
                return i === Object.values(country.currencies).length - 1
                  ? currency.name + ' '
                  : currency.name + ', ';
              })}
      </div>
      <div>
        Languages:{' '}
        {!country.languages
          ? 'None'
          : Object.values(country.languages)
              .sort()
              .map((language, i) => {
                return i === Object.values(country.languages).length - 1
                  ? language + ' '
                  : language + ', ';
              })}
      </div>
      <div>Border Countries:</div>
      <div>
        {borderCountries.length !== 0
          ? borderCountries
              .sort((a, b) => a.name.common.localeCompare(b.name.common))
              .map((country: CountryType) => {
                return (
                  <button
                    key={country.cca2}
                    onClick={() => router.push(`/countries/${country.cca2}`)}
                  >
                    {country.name.common}
                  </button>
                );
              })
          : 'None'}
      </div>
      <button onClick={() => router.back()}>Back</button>
    </main>
  );
}
