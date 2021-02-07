import { all, call, put, takeEvery } from 'redux-saga/effects';

import { Actions, ActionTypes, ActionTypesUnion } from './actions';

import { request } from '../../shared/utils/request';
import { AddressPayloadType } from '../../shared/types/address.types';

function* login() {
  try {
    const { ethereum } = window as any;
    const data = yield ethereum.request({ method: 'eth_requestAccounts' });
    yield localStorage.setItem('address', data[0]);
    yield put(Actions.loginSuccess({ address: data[0] as string }));
  } catch (err) {
    yield put(Actions.loginFailed({ message: err }));
  }
}

function* getTokens(action: {
  payload: { address: string };
  type: ActionTypesUnion;
}) {
  try {
    const { address } = action.payload;
    const {
      data,
      error_message,
    }: { data: AddressPayloadType; error_message: string | null } = yield call(
      request,
      `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/`
    );

    if (!error_message) {
      yield put(Actions.getBalancesSuccess(data));
    } else {
      yield put(Actions.getBalancesFailed({ message: error_message }));
    }
  } catch (err) {
    yield put(Actions.getBalancesFailed({ message: err }));
  }
}

export function* watchUserRequests() {
  yield all([
    takeEvery(ActionTypes.GET_BALANCES_REQUEST, getTokens),
    takeEvery(ActionTypes.LOGIN_REQUEST, login),
  ]);
}
