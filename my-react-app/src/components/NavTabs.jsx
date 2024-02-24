import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Map from './Map';
import { DateTime } from 'luxon';

function NavTabs() {
  const [myIp, setMyIp] = useState(null);
  const [location, setLocation] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey);

  useEffect(() => {
    const fetchMyIp = async () => {
      try {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
        const data = await response.json();
        setMyIp(data.ip);
        setLocation(data.location);

        // Fetch additional country information using restcountries.com API
        const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${data.location.country}`);
        const countryData = await countryResponse.json();
        setCountryInfo(countryData[0]);
      } catch (error) {
        console.error('Error fetching IP or country information:', error);
      }
    };

    fetchMyIp();
  }, [apiKey]);

  return (
    <Tabs variant='soft-rounded' colorScheme='green' className='Content'>
      <TabList mb='1em'>
        <Tab>MY IP</Tab>
        <Tab>MAP</Tab>
        <Tab>MORE INFO</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>{myIp ? `Your IP address: ${myIp}` : `Your IP address: Loading...`}</p>
          <p>Your Code: {location && location.country}</p>
          <p>Your Region: {location && location.region}</p>
          <p>Your Timezone: GTM{location && location.timezone}</p>
        </TabPanel>
        <TabPanel>
          <Map />
        </TabPanel>
        <TabPanel>
        {countryInfo ? (
            <>
              <strong>{countryInfo.name.official}</strong>
              <p>Capital: {countryInfo.capital}</p>
              <p>Population: {countryInfo.population.toLocaleString()} Inhabitants</p>
              <p>Subregion: {countryInfo.subregion}</p>
              <p>Continent: {countryInfo.continents}</p>
              <div><img src={countryInfo.flags.png} alt="flag" /></div>
            </>
          ) : (
            <p>Loading country information...</p>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default NavTabs;