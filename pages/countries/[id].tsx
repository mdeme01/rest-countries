import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CountryType from '../../types/CountryType';
import axios from 'axios';

export async function getServerSideProps(context: { params: { id: string } }) {
  const res = await axios.get(`https://restcountries.com/v3.1/name/${context.params.id}`);
  const data: CountryType[] = await res.data;
  const countryData: CountryType = data[0];
  return { props: { countryData } };
}

export default function CountryDetails({ countryData }) {
  return (
    <div>
      <Image width='300' height='150' src={countryData.flags.png} alt='flag' />
      <div>{countryData.name.official}</div>
      <div>Population: {countryData.population}</div>
      <div>Region: {countryData.region}</div>
      <div>Capital: {countryData.capital}</div>
      <Link href='/'>Back to home</Link>
    </div>
  );
}
