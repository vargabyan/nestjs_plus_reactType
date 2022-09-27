import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDataForm {
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  id?: number;
}

export interface IDataFormState {
  value: IDataForm;
  status: string;
}

const initialState: IDataFormState = {
  value: {
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    id: undefined,
  },
  status: "Register",
}

const getDataFormSlice = createSlice({
  name: "dataForm",
  initialState,
  reducers: {
    changeDataForm: (state, action: PayloadAction<IDataForm>) => {
        state.value = action.payload
    },
    changeStatusForm: (state, action: PayloadAction<string>) => {
        state.status = action.payload
    },
  },
})

export const { changeDataForm, changeStatusForm } = getDataFormSlice.actions;
export default getDataFormSlice.reducer;