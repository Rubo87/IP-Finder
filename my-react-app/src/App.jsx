import { useState } from 'react'
import './App.css'
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import NavTabs from './components/NavTabs.jsx'
import NavBar from './components/NavBar.jsx'

function App() {

  return (
    <ChakraProvider>   
      <NavBar />
      <NavTabs />
    </ChakraProvider> 

 )
}

export default App


