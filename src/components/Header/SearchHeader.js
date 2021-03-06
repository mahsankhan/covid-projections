import React from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GlobalSelector } from 'components/MapSelectors/MapSelectors';
import MapIcon from 'assets/images/mapIcon';

import {
  Wrapper,
  Content,
  SelectorWrapper,
  MapToggle,
  MenuBarWrapper,
} from './SearchHeader.style';

const SearchHeader = ({
  children,
  mobileMenuOpen,
  setMobileMenuOpen,
  mapOption,
  setMapOption,
  location,
  locationName,
  countyName = null,
  intervention,
}) => {
  const history = useHistory();
  const isMobile = useMediaQuery('(max-width:1350px)');

  const handleSelectChange = option => {
    let route = `/state/${option.state_code}`;

    if (option.county_url_name) {
      route = `${route}/county/${option.county_url_name}`;
    }

    history.push(route);

    window.scrollTo(0, 0);

    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((mobileMenuOpen = !mobileMenuOpen));
  };

  return (
    <Wrapper>
      <Content>
        <MenuBarWrapper>
          <SelectorWrapper>
            <GlobalSelector
              extendRight={true}
              handleChange={handleSelectChange}
            />
          </SelectorWrapper>
          {isMobile && (
            <MapToggle
              onClick={() => toggleMobileMenu()}
              isActive={mobileMenuOpen}
            >
              <MapIcon />
            </MapToggle>
          )}
        </MenuBarWrapper>
      </Content>
    </Wrapper>
  );
};

export default SearchHeader;
