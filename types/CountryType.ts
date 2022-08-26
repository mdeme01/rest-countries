type CountryType = {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  flags: {
    png: string;
  };
  population: string;
  region: string;
  capital: string;
  borders: string[];
};

export default CountryType;
