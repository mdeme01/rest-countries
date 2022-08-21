import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import CountryType from '../types/CountryType';

export default function Country(props: { data: CountryType }) {
  return (
    <a href={`/countries/${props.data.cca2}`} className={styles.cardLink}>
      <Image width='300' height='150' src={props.data.flags.png} alt='flag' />
      <div>{props.data.name.official}</div>
      <div>Population: {props.data.population}</div>
      <div>Region: {props.data.region}</div>
      <div>Capital: {props.data.capital}</div>
    </a>
  );
}
