import { ActionTypes, ActionTypesUnion } from './actions';

import {
  AddressStateType,
  TokenItemType,
} from '../../shared/types/address.types';

const addressDataInitialState: AddressStateType = {
  ethBalance: 0,
  pieChartData: [],
  tokens: null,
  address: localStorage.getItem('address') ?? '',
  viewAddress: '',
  loading: false,
  error: '',
};

export const reducer = (
  state = addressDataInitialState,
  action: ActionTypesUnion
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        address: action.payload.address,
      };
    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        error: action.payload.message,
      };
    case ActionTypes.SWITCH_ACCOUNT:
      return {
        ...state,
        address: action.payload.address,
      };
    case ActionTypes.CLEAR_PIE_CHART_DATA:
      return {
        ...state,
        pieChartData: [],
        ethBalance: 0,
        tokens: null,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        pieChartData: [],
        ethBalance: 0,
        address: '',
        tokens: null,
      };
    case ActionTypes.GET_BALANCES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GET_BALANCES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case ActionTypes.GET_BALANCES_SUCCESS:
      const { items }: { items: TokenItemType[] } = action.payload;

      const filteredItems =
        items &&
        items.length &&
        items.filter((item: TokenItemType, idx: number) => idx < 10 && item);

      const findEthToken = items.find(
        (item: TokenItemType) => item.contract_ticker_symbol === 'ETH'
      );

      const pieChartData = items.map((item: TokenItemType) => ({
        value: item.quote,
        title: item.contract_ticker_symbol,
        color:
          '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
      }));

      return {
        ...state,
        pieChartData,
        ethBalance: findEthToken ? Number(findEthToken.balance) : 0,
        tokens: {
          limit: filteredItems,
          length: items.length,
        },
        loading: false,
      };
    default:
      return state;
  }
};
