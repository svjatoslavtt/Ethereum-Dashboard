import { createSelector } from 'reselect';

import { AddressState } from './reducer';

import { RootState } from '../store';

const getAddressData = (state: RootState) => state.addressData;

export const getAddress = createSelector(
  getAddressData,
  (state: AddressState) => state.address
);

export const getTokens = createSelector(
  getAddressData,
  (state: AddressState) => state.tokens
);

export const getEthBalance = createSelector(
  getAddressData,
  (state: AddressState) => state.ethBalance
);

export const getPieChartData = createSelector(
  getAddressData,
  (state: AddressState) => state.pieChartData
);

export const getLoadingState = createSelector(
  getAddressData,
  (state: AddressState) => state.loading
);
