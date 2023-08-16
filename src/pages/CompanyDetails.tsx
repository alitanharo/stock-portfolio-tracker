import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDataContext } from '../context/DataContext';
import { Heading, Text, Spinner } from '@chakra-ui/react';
import { DetailContainer, BackLink, LoadingContainer } from '../style/CompanyDetail.styles'

const CompanyDetail: React.FC = () => {
    const { symbol } = useParams<{ symbol: string | undefined }>();
    const { companyData, fetchCompanyData } = useDataContext();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (symbol) {
                setLoading(true);
                await fetchCompanyData(symbol);
                setLoading(false);
            }
        };

        if (!companyData.Symbol || (symbol && companyData.Symbol !== symbol)) {
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
