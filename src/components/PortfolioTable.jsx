import React from 'react';
import PortfolioItem from './PortfolioItem';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const PortfolioTable = ({ items, onRemove }) => {
    return (
        <Table variant="simple" width="100%">
            <Thead>
                <Tr>
                    <Th>Stock Name</Th>
                    <Th> Symbol</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {items.map((item) => (
                    <PortfolioItem
                        key={item.symbol}
                        symbol={item.symbol}
                        name={item.name}
                        onRemove={onRemove}
                    />
                ))}
            </Tbody>
        </Table>
    );
};

export default PortfolioTable;
