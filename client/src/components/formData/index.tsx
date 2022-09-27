import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { FormStyle } from "./FormDataStyle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import {
  changeDataForm,
  changeStatusForm,
  IDataForm,
} from "../../reducers/getDataForm";
import { getDataListDb } from "../../reducers/getDataList";
import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import useHttpRequest from "../../hook/useHttpRequest";

const FormData: React.FC = () => {
  const dataForm = useSelector((state: RootState) => state.dataForm.value);
  const dataList = useSelector((state: RootState) => state.dataList.value);
  const statusForm = useSelector((state: RootState) => state.dataForm.status);
  const dispatch = useDispatch();
  const [firstnameError, setFirstnameError] = useState<string>("");
  const [lastnameError, setLastnameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");
  const [statusButton, setStatusButton] = useState<boolean>(false);
  const { hookRequest } = useHttpRequest();

  let schema = yup.object().shape({
    firstname: yup.string().required(() => {
      setFirstnameError("required");
    }),
    lastname: yup.string().required(() => {
      setLastnameError("required");
    }),
    email: yup
      .string()
      .email(() => {
        setEmailError("invalid email");
      })
      .required(() => {
        setEmailError("required");
      }),
    age: yup.number().required(() => {
      setAgeError("required");
    }),
  });

  const handleChangeFormData = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
      target: { id },
    } = e;
    const data = JSON.parse(`{"${id}": "${value}"}`);
    dispatch(changeDataForm({ ...dataForm, ...data }));

    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setAgeError("");

    await schema.isValid({ ...dataForm, ...data });
  };

  const handleCancel = () => {
    dispatch(
      changeDataForm({
        id: undefined,
        firstname: "",
        lastname: "",
        age: "",
        email: "",
      })
    );
    if (statusForm === "Edit") {
      dispatch(changeStatusForm("Register"));
    }
    setStatusButton(false);
  };

  const handleSubmit = async () => {
    setStatusButton(true);

    if (statusForm === "Register") {
      let newData: IDataForm = {
        firstname: dataForm.firstname,
        lastname: dataForm.lastname,
        email: dataForm.email,
        age: dataForm.age,
      };

      await schema.isValid(newData).then(async (valid) => {
        if (valid) {
          let result: IDataForm = await hookRequest(
            "post",
            "/register",
            newData
          );
          if (result) {
            dispatch(getDataListDb([result, ...dataList]));
            handleCancel();
          } else {
            setEmailError("this email address already exists");
          }
        }
      });
    } else if (statusForm === "Edit") {
      await schema.isValid(dataForm).then(async (valid) => {
        if (valid) {
          let result: number = await hookRequest("put", "/edit", dataForm);
          if (result) {
            dispatch(
              getDataListDb(
                dataList.map((elem) => {
                  if (elem.id === dataForm.id) {
                    return {
                      id: elem.id,
                      age: dataForm.age,
                      email: dataForm.email,
                      firstname: dataForm.firstname,
                      lastname: dataForm.lastname,
                    };
                  } else {
                    return elem;
                  }
                })
              )
            );
            handleCancel();
          }
        }
      });
    }
    setStatusButton(false);
  };

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item>
        <FormStyle>
          <Grid container direction="column" alignContent="center" spacing={3}>
            <Grid item>
              <Typography variant="h5" className="formHeader">
                {`${statusForm} person`}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                label="Firstname"
                variant="standard"
                required
                id="firstname"
                value={dataForm.firstname}
                onChange={handleChangeFormData}
                helperText={firstnameError}
                error={firstnameError ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                label="Lastname"
                id="lastname"
                value={dataForm.lastname}
                onChange={handleChangeFormData}
                variant="standard"
                required
                helperText={lastnameError}
                error={lastnameError ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                label="age"
                variant="standard"
                required
                type="number"
                id="age"
                minRows={1}
                maxRows={140}
                value={dataForm.age}
                onChange={handleChangeFormData}
                helperText={ageError}
                error={ageError ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                disabled={statusForm === "Edit" ? true : false}
                size="small"
                label="email"
                variant="standard"
                required
                id="email"
                value={dataForm.email}
                onChange={handleChangeFormData}
                helperText={emailError}
                error={emailError ? true : false}
              />
            </Grid>
          </Grid>
          <Grid
            container
            className="formFooter"
            direction="column"
            alignContent="center"
          >
            <Grid item>
              <Button
                disabled={statusButton}
                variant="outlined"
                onClick={handleSubmit}
              >
                {statusForm}
              </Button>
              <Button
                disabled={statusButton}
                variant="outlined"
                onClick={handleCancel}
              >
                cancel
              </Button>
            </Grid>
          </Grid>
        </FormStyle>
      </Grid>
    </Grid>
  );
};

export default FormData;
