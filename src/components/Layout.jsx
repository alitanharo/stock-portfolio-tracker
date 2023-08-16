import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <Box minHeight="100vh" >
            <Header />

            <Flex direction="column" alignItems="center" justifyContent="flex-start" p={4}>
                <Box width="100%" maxWidth="1200px" p={4}>
                    {children}
                </Box>
            </Flex>
        </Box>
    );
};

export default Layout;
