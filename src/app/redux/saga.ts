import { all } from "redux-saga/effects";

import { watchUserRequests } from "./common/sagas";

export function* rootSaga() {
  yield all([
		watchUserRequests(),
  ]);
}