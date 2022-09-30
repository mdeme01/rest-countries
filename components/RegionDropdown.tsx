import { useRouter } from 'next/router';
import { styled } from '@mui/material';
import { useState } from 'react';

const Dropdown = styled('div')({
  position: 'relative',
  display: 'inline-block',
});

const DropdownContent = styled('div')(({ theme }) => ({
  backgroundColor: theme.backgroundColor.main,
  position: 'absolute',
  minWidth: '160px',
  boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
  padding: '12px 16px',
  zIndex: '1',
  gridTemplateRows: '1fr',
  gap: '1rem',
  borderRadius: '5px',
  marginTop: '30px',
  cursor: 'pointer',
}));

const DropdownText = styled('span')(({ theme }) => ({
  backgroundColor: theme.backgroundColor.main,
  padding: '20px',
  textAlign: 'center',
  borderRadius: '5px',
}));

const DropdownItem = styled('div')({
  placeSelf: 'start',
});

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
    <Dropdown
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <DropdownText>Filter by region: {region}</DropdownText>
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
