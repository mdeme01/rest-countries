export async function getAllCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const allCountryData = await res.json();

  return allCountryData.map((country) => {
    return {
      params: {
        id: country.name.official,
      },
    };
  });
}

export async function getCountryByID(id: string) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${id}`);
  const countryData = await res.json();

  return {
    id,
    ...countryData,
  };
}
