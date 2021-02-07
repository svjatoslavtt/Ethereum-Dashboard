import { all, call, put, takeEvery } from 'redux-saga/effects';

import { Actions, ActionTypes, ActionTypesUnion } from './actions';

import { request } from '../../utils/request';

function* login() {
  try {
    const { ethereum } = window as any;
    const data = yield ethereum.request({ method: 'eth_requestAccounts' });
    yield localStorage.setItem('address', data[0]);
    yield put(Actions.loginSuccess({ address: data[0] as string }));
  } catch (err) {
    yield put(Actions.loginFailed(err));
  }
}

function* getTokens(action: {
  payload: { address: string };
  type: ActionTypesUnion;
}) {
  try {
    const { address } = action.payload;
    const { data } = yield call(
      request,
      `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/`
    );
    yield put(Actions.getBalancesSuccess(data));
  } catch (err) {
    yield put(Actions.getBalancesFailed(err));
  }
}

export function* watchUserRequests() {
  yield all([
    takeEvery(ActionTypes.GET_BALANCES_REQUEST, getTokens),
    takeEvery(ActionTypes.LOGIN_REQUEST, login),
  ]);
}
