export interface PortfolioItemProps {
    symbol: string;
    name: string;
    onRemove: (symbol: string) => void;
}
