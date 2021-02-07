import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import { reducer as AddressDataReducer } from './common/reducer';
import { rootSaga } from './saga';

import { AddressState } from '../shared/types/address.types';

const sagaMiddleware = createSagaMiddleware();

export type RootState = {
  addressData: AddressState;
};

const rootReducers = combineReducers({
  addressData: AddressDataReducer,
});

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
