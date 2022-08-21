import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CountryType from '../../types/CountryType';
import axios from 'axios';

export async function getServerSideProps(context: { params: { id: string } }) {
  const res = await axios.get(`https://restcountries.com/v3.1/alpha/${context.params.id}`);
  const data: CountryType[] = await res.data;
  const country: CountryType = data[0];
  return { props: { country } };
}

export default function CountryDetails({ country }: { country: CountryType }) {
  const router = useRouter();

  return (
    <div>
      <Image width='300' height='150' src={country.flags.png} alt='flag' />
      <div>{country.name.official}</div>
      <div>Population: {country.population}</div>
      <div>Region: {country.region}</div>
      <div>Capital: {country.capital}</div>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
}
