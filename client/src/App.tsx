import React from "react";
import Grid from "@mui/material/Grid";
import ListPersons from "./components/listPersons";
import FormData from "./components/formData";
import TopAppBar from "./components/topAppBar";

const App: React.FC = function () {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TopAppBar />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} lg={5}>
            <FormData />
          </Grid>
          <Grid item xs={12} lg={7}>
            <ListPersons />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

};
export default App;
