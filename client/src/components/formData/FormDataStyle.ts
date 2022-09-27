import { styled } from "@mui/material/styles";

export const FormStyle = styled('div')`
  width: 400px;
  border-radius: 3px 3px;
  box-shadow: 0 0 45px #d4d4d4;
  padding-top: 20px;
  margin-top: 20%;
  
  .formHeader {

    font-family: 'Lobster', cursive;
    color: #000000a6;
  }

  .formFooter {
    margin-top: 10px;
    background: #1976d2cf;
    padding-top: 10px;
    padding-bottom: 15px;

    button {
      margin-top: 10px;
      margin-bottom: 15px;
      background: white;
      margin-left: 6px;
    }
  }
`;