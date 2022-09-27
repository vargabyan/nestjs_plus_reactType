import { configureStore } from "@reduxjs/toolkit";
import getDataFormReducer from "../reducers/getDataForm";
import getDataListReducer from "../reducers/getDataList";

export const store = configureStore({
  reducer: {
    dataForm: getDataFormReducer,
    dataList: getDataListReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;