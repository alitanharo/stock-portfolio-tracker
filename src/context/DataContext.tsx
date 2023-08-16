import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CompanyData {
    [key: string]: any; 
}

interface SearchResult {
    '1. symbol': string;
    '2. name': string;
}

interface PortfolioItem {
    symbol: string;
    name: string;
}

interface DataContextValue {
    companyData: CompanyData;
    searchResults: SearchResult[];
    fetchCompanyData: (symbol: string) => void;
    fetchSearchResults: (input: string) => void;
    setPortfolioItemsToCookies: (symbol: string, name: string) => void;
    getPortfolioItemsFromCookies: () => PortfolioItem[];
    removeFromPortfolio: (symbol: string) => PortfolioItem[];
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const useDataContext = (): DataContextValue => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
    const [companyData, setCompanyData] = useState<CompanyData>({});
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const API_KEY = process.env.REACT_APP_API_KEY || ''; // Access the API key from environment variable;
    const [cachedData, setCachedData] = useState<CompanyData>({});

    const fetchCompanyData = async (symbol: string) => {
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

    const fetchSearchResults = async (input: string) => {
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

    const setPortfolioItemsToCookies = (symbol: string, name: string) => {
        const existingPortfolio = Cookies.get('portfolioItems') || '[]';
        const updatedPortfolio: PortfolioItem[] = JSON.parse(existingPortfolio);
        updatedPortfolio.push({ symbol, name });
        Cookies.set('portfolioItems', JSON.stringify(updatedPortfolio));
    };

    const getPortfolioItemsFromCookies = (): PortfolioItem[] => {
        const portfolioItems = Cookies.get('portfolioItems');
        return portfolioItems ? JSON.parse(portfolioItems) : [];
    };

    const removeFromPortfolio = (symbol: string): PortfolioItem[] => {
        const existingPortfolio = Cookies.get('portfolioItems') || '[]';
        const updatedPortfolio: PortfolioItem[] = JSON.parse(existingPortfolio);
        const updatedPortfolioWithoutItem = updatedPortfolio.filter((item) => item.symbol !== symbol);
        Cookies.set('portfolioItems', JSON.stringify(updatedPortfolioWithoutItem));
        return updatedPortfolioWithoutItem;
    };

    const contextValue: DataContextValue = {
        companyData,
        searchResults,
        fetchCompanyData,
        fetchSearchResults,
        setPortfolioItemsToCookies,
        getPortfolioItemsFromCookies,
        removeFromPortfolio,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};
