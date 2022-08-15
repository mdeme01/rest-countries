import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${context.params.id}`);
  const countryData = await res.json();
  return { props: { countryData } };
}

export default function CountryDetails({ countryData }) {
  return (
    <div>
      <Image width='300' height='150' src={countryData[0].flags.png} alt='flag' />
      <div>{countryData[0].name.official}</div>
      <div>Population: {countryData[0].population}</div>
      <div>Region: {countryData[0].region}</div>
      <div>Capital: {countryData[0].capital}</div>
      <Link href='/'>Back to home</Link>
    </div>
  );
}
