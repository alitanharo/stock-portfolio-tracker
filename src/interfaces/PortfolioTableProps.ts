export interface PortfolioTableProps {
    items: { symbol: string; name: string }[];
    onRemove: (symbol: string) => void;
}
