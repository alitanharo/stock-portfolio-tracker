/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PortfolioTable from '../components/PortfolioTable';
import SearchSection from '../components/SearchSection';
import { useDataContext } from '../context/DataContext';
import { Box, Container, Flex, SimpleGrid, VStack } from '@chakra-ui/react';

const Dashboard: React.FC = () => {
    const { getPortfolioItemsFromCookies, removeFromPortfolio } = useDataContext();
    const [portfolioItems, setPortfolioItems] = useState<{ symbol: string; name: string }[]>([]);

    const handleAddToPortfolio = async () => {
        const previousItems = await getPortfolioItemsFromCookies();
        setPortfolioItems(previousItems);
    };

    useEffect(() => {
        handleAddToPortfolio();
    }, []);

    const handleRemoveFromPortfolio = (symbol: string) => {
        const updatedPortfolio = removeFromPortfolio(symbol);
        setPortfolioItems(updatedPortfolio);
    };

    return (
        <Box p={4}>
            <Container maxW="container.xl">
                <Flex direction="column" align="center">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} width="100%">
                        <VStack spacing={4} align="stretch">
                            <SearchSection addToPortfolio={handleAddToPortfolio} />
                        </VStack>
                        <VStack spacing={4} align="stretch">
                            <PortfolioTable items={portfolioItems} onRemove={handleRemoveFromPortfolio} />
                        </VStack>
                    </SimpleGrid>
                </Flex>
            </Container>
        </Box>
    );
};

export default Dashboard;
