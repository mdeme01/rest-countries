import { styled } from '@mui/material';

export const MainContainer = styled('main')(({ theme }) => ({
  display: 'grid',
  gap: '3rem',
  gridTemplate: `
    'search . regions' auto
    'countries countries countries' auto
    / auto auto
  `,
  [theme.breakpoints.down('md')]: {
    gridTemplate: `
    'search' auto
    'regions' auto
    'countries' auto
    / auto
  `,
  },
}));

export const CardGrid = styled('div')({
  display: 'grid',
  gap: '3rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  marginTop: '2rem',
  placeContent: 'center',
  gridArea: 'countries',
});

export const CardLink = styled('a')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  width: '100%',
  maxWidth: '320px',
  height: '400px',
  borderRadius: '10px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '320px 200px',
  backgroundPosition: 'top center',
});

export const CardText = styled('div')({
  gridRowStart: 2,
  justifySelf: 'start',
  alignSelf: 'center',
  paddingLeft: '20px',
  paddingTop: '30px',
});
