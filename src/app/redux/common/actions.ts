import { action, ActionType } from 'typesafe-actions';

import { AddressPayloadType } from '../../shared/types/address.types';

export enum ActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',

  LOGOUT = 'LOGOUT',

  GET_BALANCES_REQUEST = 'GET_BALANCES_REQUEST',
  GET_BALANCES_SUCCESS = 'GET_BALANCES_SUCCESS',
  GET_BALANCES_FAILED = 'GET_BALANCES_FAILED',

  SWITCH_ACCOUNT = 'SWITCH_ACCOUNT',

  CLEAR_DATA = 'CLEAR_DATA',
}

export const Actions = {
  loginRequest: () => action(ActionTypes.LOGIN_REQUEST),
  loginSuccess: (payload: { address: string }) =>
    action(ActionTypes.LOGIN_SUCCESS, payload),
  loginFailed: (payload: { message: string }) =>
    action(ActionTypes.LOGIN_FAILED, payload),

  logout: () => action(ActionTypes.LOGOUT),

  getBalancesRequest: (payload: { address: string }) =>
    action(ActionTypes.GET_BALANCES_REQUEST, payload),
  getBalancesSuccess: (payload: AddressPayloadType) =>
    action(ActionTypes.GET_BALANCES_SUCCESS, payload),
  getBalancesFailed: (payload: { message: string }) =>
    action(ActionTypes.GET_BALANCES_FAILED, payload),

  switchAccount: (payload: { address: string }) =>
    action(ActionTypes.SWITCH_ACCOUNT, payload),

  handleClearData: () => action(ActionTypes.CLEAR_DATA),
};

export type ActionTypesUnion = ActionType<typeof Actions>;
