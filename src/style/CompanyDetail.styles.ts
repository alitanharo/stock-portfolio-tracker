import styled from 'styled-components';
import { Container, Link as ChakraLink } from '@chakra-ui/react';

export const DetailContainer = styled(Container)`
    padding: 2rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const BackLink = styled(ChakraLink)`
    display: inline-block;
    margin-bottom: 1rem;
    color: #3182ce;
    transition: color 0.2s;

    &:hover {
        color: #2c5282;
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
`;
