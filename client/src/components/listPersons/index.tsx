import React, { useEffect, useState } from "react";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { ListPersonsStyle } from "./ListPersonsStyle";
import { IDataForm } from "../../reducers/getDataForm";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { changeDataForm, changeStatusForm } from "../../reducers/getDataForm";
import { getDataListDb } from "../../reducers/getDataList";
import { DialogActions, DialogTitle } from "@mui/material";
import useHttpRequest from "../../hook/useHttpRequest";

const columns: GridColDef[] = [
  { field: "firstname", headerName: "Fnrst name", width: 145 },
  { field: "lastname", headerName: "Last name", width: 145 },
  { field: "age", headerName: "Age", type: "number", width: 145 },
  { field: "email", headerName: "Email", width: 145 },
];

const ListPersons: React.FC = () => {
  const [selectedData, setSelectedData] = useState<IDataForm>({
    id: undefined,
    firstname: "",
    lastname: "",
    age: "",
    email: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dataList = useSelector((state: RootState) => state.dataList.value);
  const { hookRequest } = useHttpRequest();

  useEffect(() => {
    (async () => {
      let result: Array<IDataForm> = await hookRequest("get", "/list");
      dispatch(getDataListDb(result));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    let result: number = await hookRequest("delete", "delete", { id: selectedData?.id });
    if (result) {
      let newData: Array<IDataForm> = dataList.filter(
        (elem: IDataForm) => elem.id !== selectedData?.id
      );
      dispatch(getDataListDb(newData));
      setOpen(false);
    }
  };

  const handleEdit = () => {
    dispatch(changeDataForm(selectedData));
    dispatch(changeStatusForm("Edit"));
    setSelectedData({
      id: undefined,
      firstname: "",
      lastname: "",
      age: "",
      email: "",
    });
    setOpen(false);
  };

  const handleCellClick = (value: any) => {
    const row: IDataForm = value.row;
    setSelectedData(row);
    setOpen(true);
  };

  const rows: Array<IDataForm> = dataList;

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item>
        <ListPersonsStyle>
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            pageSize={6}
            rowsPerPageOptions={[6]}
            onCellClick={handleCellClick}
          />
        </ListPersonsStyle>
      </Grid>
      <Grid item>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Do you want to ?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>delete</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default ListPersons;
