type TokenType = {
  limit: any;
  length: number;
};

export type PieChartType = {
  value: number;
  title: string;
  color: string;
};

export type AddressState = {
  ethBalance: number;
  pieChartData: PieChartType[];
  tokens: TokenType | null;
  address: string;
  viewAddress: string;
  loading: boolean;
};

export type AddressPayload = {};
