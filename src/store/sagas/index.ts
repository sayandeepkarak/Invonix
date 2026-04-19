import { all, fork } from "redux-saga/effects";
import { authSaga } from "@/features/auth/store";
import { inventorySaga } from "@/features/inventory/store";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(inventorySaga)]);
}
