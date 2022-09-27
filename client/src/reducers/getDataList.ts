import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IDataForm } from "./getDataForm";

interface IgetDataList {
  value: Array<IDataForm>
}

const initialState: IgetDataList = {
  value: []
}

const getDataListSlice = createSlice({
  name: "dataList",
  initialState,
  reducers: {
    getDataListDb: (state, action: PayloadAction<Array<IDataForm>>) => {
      state.value = action.payload
    }
  } 
})

export const { getDataListDb } = getDataListSlice.actions;
export default getDataListSlice.reducer;