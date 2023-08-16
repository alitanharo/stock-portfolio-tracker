import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import {  Heading, Text, Container, Link as ChakraLink, Spinner } from '@chakra-ui/react';
import styled from 'styled-components';

const DetailContainer = styled(Container)`
    padding: 2rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const BackLink = styled(ChakraLink)`
    display: inline-block;
    margin-bottom: 1rem;
    color: #3182ce;
    transition: color 0.2s;

    &:hover {
        color: #2c5282;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
`;

const CompanyDetail = () => {
    const { symbol } = useParams();
    const { companyData, fetchCompanyData } = useDataContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchCompanyData(symbol);
            setLoading(false);
        };

        // Fetch company data only if not already in cache
        if (!companyData.Symbol || companyData.Symbol !== symbol) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [symbol, companyData, fetchCompanyData]);

    return (
        <DetailContainer>
            <BackLink as={Link} to="/">
                Back
            </BackLink>
            {loading ? (
                <LoadingContainer>
                    <Spinner size="xl" />
                </LoadingContainer>
            ) : (
                <>
                    {Object.keys(companyData).length === 0 ? (
                        <Text fontSize="lg" color="gray.600">
                            To access this information you need a premium version of API.
                                Right now, You can only access those company detail which has only one single-letter symbol!
                        </Text>
                    ) : (
                        <>
                            <Heading size="lg" mb="1rem">
                                {companyData.Name}
                            </Heading>
                            <Text fontSize="lg" color="gray.600" mb="1rem">
                                Address: {companyData.Address}
                            </Text>
                            <Text fontSize="lg" mb="1rem">
                                Market Capitalization: {companyData.MarketCapitalization}
                            </Text>
                            <Text fontSize="lg">{companyData.Description}</Text>
                        </>
                    )}
                </>
            )}
        </DetailContainer>
    );
};

export default CompanyDetail;
