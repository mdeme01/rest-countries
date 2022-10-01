import { useRouter } from 'next/router';
import { Button, styled } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { blue } from '@mui/material/colors';

const Dropdown = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  gridArea: 'regions',
  alignSelf: 'center',
  justifySelf: 'end',
  [theme.breakpoints.down('md')]: {
    justifySelf: 'center',
  },
}));

const DropdownContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.backgroundColor.main,
  position: 'absolute',
  width: '100%',
  boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
  padding: '12px 16px',
  zIndex: '1',
  gridTemplateRows: '1fr',
  gap: '1rem',
  borderRadius: '5px',
  marginTop: '10px',
  cursor: 'pointer',
}));

const DropdownText = styled(Button)(({ theme }) => ({
  backgroundColor: theme.backgroundColor.main,
  padding: '15px 30px',
  textAlign: 'center',
  borderRadius: '5px',
  textTransform: 'none',
}));

const DropdownItem = styled('div')(({ theme }) => ({
  placeSelf: 'start',
  ':hover': {
    color: theme.textColor.hover,
  },
}));

export default function RegionDropdown() {
  const router = useRouter();
  const [region, setRegion] = useState<string>(
    (router.query.region as string) ?? 'None'
  );

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const regions = ['Africa', 'America', 'Europe', 'Asia', 'Oceania', 'None'];

  const filterRegion = (region: string) => {
    setRegion(region);
    setDropdownVisible(false);
    const url =
      region === 'None' ? '/countries' : `/countries/region/${region}`;
    router.push(url);
  };

  return (
    <Dropdown>
      <DropdownText
        endIcon={dropdownVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        Filter by region: {region}
      </DropdownText>
      <DropdownContent
        style={{
          display: dropdownVisible ? 'grid' : 'none',
        }}
      >
        {regions.map((region) => (
          <DropdownItem key={region} onClick={() => filterRegion(region)}>
            {region}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
