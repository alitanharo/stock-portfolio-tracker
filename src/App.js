import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components'; 
import theme from './style/theme'; 
import { DataProvider } from './context/DataContext';
import Dashboard from './pages/Dashboard';
import CompanyDetails from './pages/CompanyDetails';
import Layout from './components/Layout';

const App = () => {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}> 
        <Router>
          <DataProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/company/:symbol" element={<CompanyDetails />} />
              </Routes>
            </Layout>
          </DataProvider>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  );
};

export default App;
