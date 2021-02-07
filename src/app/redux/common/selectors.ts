import { createSelector } from 'reselect';

import { RootState } from '../store';

import { AddressStateType } from '../../shared/types/address.types';

const getAddressData = (state: RootState) => state.addressData;

export const getAddress = createSelector(
  getAddressData,
  (state: AddressStateType) => state.address
);

export const getTokens = createSelector(
  getAddressData,
  (state: AddressStateType) => state.tokens
);

export const getEthBalance = createSelector(
  getAddressData,
  (state: AddressStateType) => state.ethBalance
);

export const getPieChartData = createSelector(
  getAddressData,
  (state: AddressStateType) => state.pieChartData
);

export const getLoadingState = createSelector(
  getAddressData,
  (state: AddressStateType) => state.loading
);
