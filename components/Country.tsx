import CountryType from '../types/CountryType';
import { CardLink, CardText } from './StyledComponents';
import { colors } from '../utils/themes';
import { useContext } from 'react';
import {
  CustomThemeContextType,
  CustomThemeContext,
} from './CustomThemeProvider';

export default function Country(props: { data: CountryType }) {
  const Theme: CustomThemeContextType = useContext(
    CustomThemeContext
  ) as unknown as CustomThemeContextType;

  return (
    <CardLink
      href={`/countries/${props.data.cca2}`}
      style={{
        backgroundImage: `url(${props.data.flags.png})`,
        backgroundColor: Theme.darkMode ? colors.darkBlue : colors.white,
        boxShadow: Theme.darkMode
          ? `1px 1px 1px ${colors.veryDarkBlueBG}`
          : `1px 1px 1px ${colors.darkGray}`,
      }}
    >
      <CardText>
        <h2>{props.data.name.common}</h2>
        <div>
          <b>Population:</b> {props.data.population.toLocaleString()}
        </div>
        <div>
          <b>Region:</b> {props.data.region}
        </div>
        <div>
          <b>Capital:</b> {props.data.capital}
        </div>
      </CardText>
    </CardLink>
  );
}
