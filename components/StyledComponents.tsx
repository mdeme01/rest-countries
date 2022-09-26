import styled from '@emotion/styled';

export const CustomHeader = styled('header')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '50px',
  padding: '20px 80px',
  width: '100%',
});

export const ThemeButton = styled('button')({
  backgroundColor: 'unset',
  border: 'none',
  cursor: 'pointer',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  placeContent: 'center',
});

export const CardGrid = styled('div')({
  display: 'grid',
  gap: '3rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  marginTop: '2rem',
  placeContent: 'center',
});

export const CardLink = styled('a')({
  width: '320px',
  height: '400px',
  color: 'unset',
  textDecoration: 'none',
  borderRadius: '10px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '320px 200px',
  backgroundPosition: 'top center',
  display: 'grid',
  gridTemplateColumns: '1fr',
});

export const CardText = styled('div')({
  gridRowStart: 2,
  justifySelf: 'start',
  alignSelf: 'center',
  paddingLeft: '20px',
  paddingTop: '30px',
});

export const Filters = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});
