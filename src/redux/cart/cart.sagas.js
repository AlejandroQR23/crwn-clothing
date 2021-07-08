import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { cleartCart } from './cart.action';

export function* cleartCartOnSignOut() {
  yield put(cleartCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, cleartCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
