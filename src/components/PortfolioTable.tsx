import React from 'react';
import PortfolioItem from './PortfolioItem';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { PortfolioTableProps } from '../interfaces/PortfolioTableProps'; 

const PortfolioTable: React.FC<PortfolioTableProps> = ({ items, onRemove }) => {
    return (
        <Table variant="simple" width="100%">
            <Thead>
                <Tr>
                    <Th>Stock Name</Th>
                    <Th>Symbol</Th>
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
