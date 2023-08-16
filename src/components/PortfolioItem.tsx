import React from 'react';
import { Link } from 'react-router-dom';
import { Tr, Td, IconButton, Tooltip } from '@chakra-ui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { PortfolioItemProps } from '../interfaces/PortfolioItemProps'


const StyledTr = styled(Tr)`
    &:hover {
        background: #ded7d7;
    }
`;

const StyledTd = styled(Td)`
    font-size: 14px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const StyledIconButton = styled(IconButton)`
    &:hover {
        color: red;
    }
`;

const PortfolioItem: React.FC<PortfolioItemProps> = ({ symbol, name, onRemove }) => {
    return (
        <StyledTr>
            <StyledTd>
                <StyledLink to={`/company/${symbol}`}>{name}</StyledLink>
            </StyledTd>
            <StyledTd>{symbol}</StyledTd>
            <StyledTd>
                <Tooltip label="Remove from Portfolio" hasArrow>
                    <StyledIconButton
                        icon={<AiOutlineCloseCircle />}
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => onRemove(symbol)}
                        aria-label="Remove"
                    />
                </Tooltip>
            </StyledTd>
        </StyledTr>
    );
};

export default PortfolioItem;
