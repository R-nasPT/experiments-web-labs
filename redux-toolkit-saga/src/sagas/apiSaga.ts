import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse, AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from "@/redux/slices/apiSlice";

type FetchDataAction = {
  method: string;
  url: string;
  data?: any;
};

function* fetchDataSaga(action: PayloadAction<FetchDataAction>) {
  try {
    const { method, url, data } = action.payload;
    const response: AxiosResponse = yield call(axios.request, {method, url, data})
    // const response: AxiosResponse = yield call((axios as any)[method], url, data); //<--แบบนี้ก็ได้ axios[method]
    // const response: AxiosResponse = yield call((axios as any)[action.payload.method ], action.payload.url, action.payload.data); //<--แบบนี้ก็ได้ axios[method]

    yield put(fetchDataSuccess(response.data))

  } catch (error) { //<-- หรือจะใส่แค่ (error: any) ก็หายแดงเหมือนกัน
    const axiosError: AxiosError = error as AxiosError
    yield put(fetchDataFailure(axiosError.message));
  }
}

export function* watchFetchData() {
    yield takeEvery(fetchDataStart.type, fetchDataSaga)
}