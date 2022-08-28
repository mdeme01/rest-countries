import React from 'react';
import Country from '../../components/Country';
import CountryType from '../../types/CountryType';
import styles from '../../styles/Home.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CardGrid } from '../../components/StyledComponents';

type PropsType = {
  countries: CountryType[];
};

export async function getServerSideProps() {
  const res = await axios.get('https://restcountries.com/v3.1/all');
  const countries: CountryType[] = await res.data;
  return { props: { countries } };
}

export default function Countries({ countries }: PropsType) {
  const router = useRouter();

  const filterRegion = (region: string) => {
    const url =
      region === 'None' ? '/countries' : `/countries/region/${region}`;
    router.push(url);
  };

  const search = () => {
    const query: string = (document.querySelector('#name') as HTMLInputElement)
      .value;
    const url = query === '' ? '/countries' : `/countries/name/${query}`;
    router.push(url);
  };

  return (
    <main>
      <div className={styles.filters}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search for a country"
          />
          <button onClick={() => search()}>Search</button>
        </div>
        <div className={styles.dropdown}>
          <span>Filter by region: {'None'}</span>
          <div className={styles.dropdownContent}>
            <div onClick={() => filterRegion('Africa')}>Africa</div>
            <div onClick={() => filterRegion('America')}>America</div>
            <div onClick={() => filterRegion('Europe')}>Europe</div>
            <div onClick={() => filterRegion('Asia')}>Asia</div>
            <div onClick={() => filterRegion('Oceania')}>Oceania</div>
            <div onClick={() => filterRegion('None')}>None</div>
          </div>
        </div>
      </div>
      <CardGrid>
        {countries
          .sort((a, b) => a.name.official.localeCompare(b.name.official))
          .map((country: CountryType) => {
            return (
              <React.Fragment key={country.cca2}>
                <Country data={country} />
              </React.Fragment>
            );
          })}
      </CardGrid>
    </main>
  );
}
