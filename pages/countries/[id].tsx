import { useRouter } from 'next/router';
import CountryType from '../../types/CountryType';
import axios from 'axios';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, styled } from '@mui/material';

type PropsType = {
  country: CountryType;
  borderCountries: CountryType[];
};

type ContextType = {
  params: {
    id: string;
  };
};

const MainContainer = styled('div')({
  display: 'grid',
  gridTemplate: `
    'back . .' 1fr
    'flag name name' 0.5fr
    'flag firstcol secondcol' 1fr
    'flag bcountries bcountries' 1fr
    / 1fr 0.8fr 1fr
  `,
  gap: '1rem',
  placeContent: 'center',
});

const Flag = styled('img')({
  gridArea: 'flag',
  marginRight: '5rem',
});

const Name = styled('h2')({
  gridArea: 'name',
  fontSize: '2rem',
  alignSelf: 'center',
});

const FirstColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  gridArea: 'firstcol',
});

const SecondColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  gridArea: 'secondcol',
});

const BorderCountries = styled('div')({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  gridArea: 'bcountries',
});

const BorderCountry = styled(Button)(({ theme }) => ({
  backgroundColor: theme.backgroundColor.main,
  boxShadow: `1px 1px 1px ${theme.boxShadowColor.main}`,
  textTransform: 'none',
  fontFamily: 'inherit',
  padding: '10px 20px',
  border: '0',
  borderRadius: '5px',
  cursor: 'pointer',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.backgroundColor.main,
  boxShadow: `1px 1px 1px ${theme.boxShadowColor.main}`,
  textTransform: 'none',
  fontFamily: 'inherit',
  gridArea: 'back',
  width: '6rem',
  height: '2rem',
  padding: '20px 40px',
}));

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
    <MainContainer>
      <CustomButton
        variant="text"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
      >
        Back
      </CustomButton>

      <Flag width="600" height="450" src={country.flags.png} alt="flag" />
      <Name>{country.name.common}</Name>
      <FirstColumn>
        <div>
          <b>Native Name:</b>{' '}
          {!country.name.nativeName
            ? country.name.common
            : Object.values(country.name.nativeName).reverse()[0].common}
        </div>
        <div>
          <b>Population:</b> {country.population.toLocaleString() ?? '-'}
        </div>
        <div>
          <b>Region:</b> {country.region ?? '-'}
        </div>
        <div>
          <b>Sub Region:</b> {country.subregion ?? '-'}
        </div>
        <div>
          <b>Capital:</b> {country.capital ?? '-'}
        </div>
      </FirstColumn>
      <SecondColumn>
        <div>
          <b>Top Level Domain:</b>{' '}
          {country.tld[0] ?? `.${country.cca2.toLowerCase()}`}
        </div>
        <div>
          <b>Currencies:</b>{' '}
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
          <b>Languages:</b>{' '}
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
      </SecondColumn>
      <BorderCountries>
        <div>
          <b>Border Countries:</b>
        </div>
        {borderCountries.length !== 0
          ? borderCountries
              .sort((a, b) => a.name.common.localeCompare(b.name.common))
              .map((country: CountryType) => {
                return (
                  <BorderCountry
                    key={country.cca2}
                    onClick={() => router.push(`/countries/${country.cca2}`)}
                  >
                    {country.name.common}
                  </BorderCountry>
                );
              })
          : 'None'}
      </BorderCountries>
    </MainContainer>
  );
}
