import styled from '@emotion/styled';

export const CardGrid = styled('div')({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, 320px)',
  marginTop: '2rem',
});

export const CardLink = styled('a')({
  width: '320px',
  height: '400px',
  color: 'unset',
  textDecoration: 'none',
  borderRadius: '10px',
  boxShadow: '1px 1px 1px grey',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '320px 213px',
  backgroundPosition: 'top center',
  display: 'grid',
  gridTemplateColumns: '1fr',
});

export const CardText = styled('div')({
  gridRowStart: 2,
  justifySelf: 'start',
  alignSelf: 'center',
  paddingTop: '30px',
});
