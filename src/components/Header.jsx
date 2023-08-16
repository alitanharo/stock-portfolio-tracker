import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex, Spacer, Text, useColorMode } from '@chakra-ui/react';
import { MdDashboard } from 'react-icons/md'; 

const HeaderWrapper = styled.header`
  background-color: #1e2022;
  color: white;
`;

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode(); 

    return (
        <HeaderWrapper>
            <Flex p={4} align="center">
                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        Stock Portfolio Tracker
                    </Text>
                </Box>
                <Spacer />
                <Box>
                    <MdDashboard size={24} style={{ cursor: 'pointer' }} /> {/* Use an icon */}
                </Box>
                <Box ml={4}>
                    <button onClick={toggleColorMode}>
                         {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                    </button>
                </Box>
            </Flex>
        </HeaderWrapper>
    );
};

export default Header;
