import { all } from "redux-saga/effects";
import { watchFetchData } from "./apiSaga";

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    // เพิ่ม Sagas อื่น ๆ ตรงนี้ (ถ้ามี)
  ]);
}
