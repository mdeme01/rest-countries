import { CurrencyType } from "./CurrencyType";
import { LanguageType } from "./LanguageType";
import { NativeNameType } from "./NativeNameType";

type CountryType = {
  name: {
    common: string;
    official: string;
    nativeName: NativeNameType[];
  };
  tld: string[];
  cca2: string;
  currencies: CurrencyType[];
  capital: string;
  region: string;
  subregion: string;
  languages: LanguageType[];
  borders: string[];
  population: string;
  flags: {
    png: string;
  };
};

export default CountryType;
