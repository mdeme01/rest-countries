import Image from "next/image";
import { useRouter } from "next/router";
import CountryType from "../../types/CountryType";
import axios from "axios";
import React from "react";

export async function getServerSideProps(context: { params: { id: string } }) {
  const res = await axios.get(`https://restcountries.com/v3.1/alpha/${context.params.id}`);
  const data: CountryType[] = await res.data;
  const country: CountryType = data[0];

  const borderCountries: CountryType[] = [];

  await Promise.all(
    country.borders.map(async (code) => {
      await axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then((res) => {
        const data: CountryType[] = res.data;
        borderCountries.push(data[0]);
      });
    })
  );

  return { props: { country, borderCountries } };
}

export default function CountryDetails({
  country,
  borderCountries,
}: {
  country: CountryType;
  borderCountries: CountryType[];
}) {
  const router = useRouter();

  return (
    <div>
      <Image width="300" height="150" src={country.flags.png} alt="flag" />
      <div>{country.name.official}</div>
      <div>Population: {country.population}</div>
      <div>Region: {country.region}</div>
      <div>Capital: {country.capital}</div>
      <button onClick={() => router.push("/countries")}>Back</button>
      <div>Border Countries:</div>
      <div>
        {borderCountries.map((country: CountryType) => {
          return (
            <button key={country.cca2} onClick={() => router.push(`/countries/${country.cca2}`)}>
              {country.name.common}
            </button>
          );
        })}
      </div>
    </div>
  );
}
