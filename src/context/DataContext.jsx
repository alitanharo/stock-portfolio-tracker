// DataContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [companyData, setCompanyData] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY; // Access the API key from environment variable;
    const [cachedData, setCachedData] = useState({});


    const fetchCompanyData = async (symbol) => {
        // Check if data is already cached
        if (cachedData[symbol]) {
            setCompanyData(cachedData[symbol]);
            return;
        }

        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
            );

            if (response.data.Note) {
                console.error('API Usage Limit Exceeded:', response.data.Note);
                setCompanyData({});
            } else {
                setCachedData({
                    ...cachedData,
                    [symbol]: response.data,
                });
                setCompanyData(response.data);
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    const fetchSearchResults = async (input) => {
        if (input) {
            try {
                const response = await axios.get(
                    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${API_KEY}`
                );
                setSearchResults(response.data.bestMatches);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setSearchResults([]);
        }
    };
    const setPortfolioItemsToCookies = (symbol, name) => {
        const existingPortfolio = Cookies.get('portfolioItems') || '[]';
        const updatedPortfolio = JSON.parse(existingPortfolio);
        updatedPortfolio.push({ symbol, name });
        Cookies.set('portfolioItems', JSON.stringify(updatedPortfolio));
    };

    const getPortfolioItemsFromCookies = () => {
        
        const portfolioItems = Cookies.get('portfolioItems');
        return portfolioItems ? JSON.parse(portfolioItems) : [];
    };

   
    const removeFromPortfolio = (symbol) => {
        const existingPortfolio = Cookies.get('portfolioItems') || '[]';
        const updatedPortfolio = JSON.parse(existingPortfolio);
        const updatedPortfolioWithoutItem = updatedPortfolio.filter((item) => item.symbol !== symbol);
        Cookies.set('portfolioItems', JSON.stringify(updatedPortfolioWithoutItem));
        return updatedPortfolioWithoutItem;
    };


    return (
        <DataContext.Provider value={{ companyData, searchResults, fetchCompanyData, fetchSearchResults, setPortfolioItemsToCookies, getPortfolioItemsFromCookies, removeFromPortfolio }}>
            {children}
        </DataContext.Provider>
    );
};
