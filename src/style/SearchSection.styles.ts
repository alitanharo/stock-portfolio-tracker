import styled from 'styled-components';
import { List } from '@chakra-ui/react';


 export const SearchContainer = styled.div`
    margin-top: 2rem;
`;

export const StyledList = styled(List)`
    max-height: 300px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #333333 #111111;

    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #999999;
        border-radius: 5px;
        border: 2px solid #111111;
    }

    &::-webkit-scrollbar-track {
        background-color: #111111;
        border-radius: 5px;
    }
`;
    