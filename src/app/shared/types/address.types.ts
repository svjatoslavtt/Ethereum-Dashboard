type TokenType = {
  limit: any;
  length: number;
};

export type PieChartType = {
  value: number;
  title: string;
  color: string;
};

export type AddressStateType = {
  ethBalance: number;
  pieChartData: PieChartType[];
  tokens: TokenType | null;
  address: string;
  viewAddress: string;
  loading: boolean;
};

export type TokenItemType = {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  logo_url: string;
  type: string;
  balance: number;
  quote_rate: number;
  quote: number;
  nft_data: null;
};

export type AddressPayloadType = {
  address: string;
  updated_at: Date;
  chain_id: number;
  next_update_at: Date;
  quote_currency: string;
  pagination?: null;
  items: TokenItemType[];
};
