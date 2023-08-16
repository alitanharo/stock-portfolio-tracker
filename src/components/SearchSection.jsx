import React, { useState } from 'react';
import { useDataContext } from '../context/DataContext';
import {
    Input,
    List,
    ListItem,
    Button,
    Collapse,
    HStack,
    Text,
    Tooltip,
    InputGroup,
    InputLeftElement, // Import InputLeftElement
} from '@chakra-ui/react';
import { FaSearch, FaPlusCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import styled from 'styled-components';

const SearchContainer = styled.div`
    margin-top: 2rem;
`;

const StyledList = styled(List)`
    max-height: 300px;
    overflow-y: auto;
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: #333333 #111111; /* Firefox */

    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #999999; /* Adjust the color here */
        border-radius: 5px;
        border: 2px solid #111111;
    }

    &::-webkit-scrollbar-track {
        background-color: #111111;
        border-radius: 5px;
    }
`;

const SearchSection = ({ addToPortfolio }) => {
    const [searchInput, setSearchInput] = useState('');
    const [showList, setShowList] = useState(false);
    const { searchResults, fetchSearchResults, setPortfolioItemsToCookies } = useDataContext();

    const handleSearchChange = async (event) => {
        const input = event.target.value;
        setSearchInput(input);
        fetchSearchResults(input);
        setShowList(true);
    };

    const handleClick = (symbol, name) => {
        setPortfolioItemsToCookies(symbol, name);
        addToPortfolio(symbol, name);
        setSearchInput('');
        setShowList(false);
    };

    return (
        <SearchContainer>
            <HStack spacing={2} align="center">
                <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<FaSearch />} />
                    <Input
                        type="text"
                        placeholder="Search for a company..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        variant="filled"
                        size="sm"
                        width="450px"
                        borderRadius="full"
                        _focus={{ borderColor: 'blue.500' }}
                        _hover={{ borderColor: 'blue.300' }}
                    />
                </InputGroup>
                <RiArrowDropDownLine
                    size={24}
                    color="blue"
                    cursor="pointer"
                    onClick={() => setShowList(!showList)}
                />
            </HStack>
            <Collapse in={showList} animateOpacity>
                <StyledList spacing={2}>
                    {searchResults &&
                        searchResults.map((result) => (
                            <ListItem key={result['1. symbol']}>
                                <HStack spacing={2} justifyContent="space-between" alignItems="center">
                                    <Text fontSize="sm" fontWeight="bold">
                                        {result['1. symbol']}
                                    </Text>
                                    <Text fontSize="sm" color="gray.600" isTruncated flexShrink={1}>
                                        {result['2. name']}
                                    </Text>
                                    <Tooltip label="Add to your portfolio">
                                        <Button
                                            onClick={() =>
                                                handleClick(result['1. symbol'], result['2. name'])
                                            }
                                            leftIcon={<FaPlusCircle />}
                                            colorScheme="blue"
                                            variant="ghost"
                                            size="sm"
                                        />
                                    </Tooltip>
                                </HStack>
                            </ListItem>
                        ))}
                </StyledList>
            </Collapse>
        </SearchContainer>
    );
};

export default SearchSection;
