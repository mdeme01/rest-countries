import CountryType from '../types/CountryType';
import { CardLink, CardText } from './StyledComponents';

export default function Country(props: { data: CountryType }) {
  return (
    <CardLink
      href={`/countries/${props.data.cca2}`}
      style={{ backgroundImage: `url(${props.data.flags.png})` }}
    >
      <CardText>
        <h2>{props.data.name.common}</h2>
        <div>
          <b>Population:</b> {props.data.population}
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
