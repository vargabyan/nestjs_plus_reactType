import { styled } from "@mui/material/styles";

export const ListPersonsStyle = styled('div')`
  margin-top: 12.5%;
  width: 600px;
  height: 425px;
  border-radius: 3px 3px;
  box-shadow: 0 0 45px #d4d4d4;
  margin-bottom: 80px;

  .MuiDataGrid-cell {
    :focus {
      outline: none !important;
    }
  }
`;
