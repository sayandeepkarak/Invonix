import { all, fork } from "redux-saga/effects";
import authSaga from "@/features/auth/store/authSaga";
import inventorySaga from "@/features/inventory/store/inventorySaga";
import { orderSaga } from "@/features/orders/store/orderSaga";
import dashboardSaga from "@/features/dashboard/store/dashboardSaga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(inventorySaga),
    fork(orderSaga),
    fork(dashboardSaga),
  ]);
}
