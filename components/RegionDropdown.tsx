import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const Dropdown = styled('div')({
  position: 'relative',
  display: 'inline-block',
});

const DropdownContent = styled('div')({
  position: 'absolute',
  backgroundColor: 'black',
  color: 'white',
  minWidth: '160px',
  boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
  padding: '12px 16px',
  zIndex: '1',
  gridTemplateRows: '1fr',
  gap: '1rem',
  borderRadius: '15px',
  marginTop: '10px',
  cursor: 'pointer',
});

const DropdownText = styled('span')({
  padding: '10px',
  textAlign: 'center',
});

const DropdownItem = styled('div')({
  placeSelf: 'start',
});

export default function RegionDropdown() {
  const router = useRouter();
  const [region, setRegion] = useState<string>(
    (router.query.region as string) ?? 'None'
  );
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

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
      <DropdownContent style={{ display: dropdownVisible ? 'grid' : 'none' }}>
        <DropdownItem onClick={() => filterRegion('Africa')}>
          Africa
        </DropdownItem>
        <DropdownItem onClick={() => filterRegion('America')}>
          America
        </DropdownItem>
        <DropdownItem onClick={() => filterRegion('Europe')}>
          Europe
        </DropdownItem>
        <DropdownItem onClick={() => filterRegion('Asia')}>Asia</DropdownItem>
        <DropdownItem onClick={() => filterRegion('Oceania')}>
          Oceania
        </DropdownItem>
        <DropdownItem onClick={() => filterRegion('None')}>None</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
