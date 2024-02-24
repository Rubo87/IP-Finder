import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState, useEffect } from 'react';

function NavTabs() {
  const [myIp, setMyIp] = useState(null);
  const [location, setLocation] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey);
  useEffect(() => {
    const fetchMyIp = async () => {
      try {
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
        const data = await response.json();
        setMyIp(data.ip);
        setLocation(data.location);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };

    fetchMyIp();
  }, []);

    return (
        <Tabs variant='soft-rounded' colorScheme='green'  className='Content'>
          <TabList  mb='1em' >
            <Tab>MY IP</Tab>
            <Tab>IP LOOKUP</Tab>
            <Tab>HIDE MY IP</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>{myIp ? `Your IP address: ${myIp}` : `Your IP address:   Loading...`}</p>
              <p>Your Country: {location && location.country}</p>
              <p>Your Region: {location && location.region}</p>
              <p>Your Timezone: {location && location.timezone}</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
    )

    
}

export default NavTabs;