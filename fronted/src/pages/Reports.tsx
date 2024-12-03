import React, { useState} from 'react';
import Menu from '../components/Menu';
import InformeColeccion from '../components/InformeColeccion';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InformeUsuario from '../components/InformeUsuario';

function Reports() {
  const [tableData, setTableData] = useState([])
  const [puls, setpuls] = useState(false);
  const [pulsUser, setpulsUser] = useState(false);

    
    const click = () => {
      setpuls(true);
      setpulsUser(false);
      fetch(`http://localhost:3030/getItems`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response.data);
            setTableData(response.data);
          });
       
    };
  
    const clickUser = () => {
      setpulsUser(true);
      setpuls(false);
        fetch(`http://localhost:3030/getItemsUser`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response.data);
            setTableData(response.data);
          });
    };
  return (
    <>
        <Menu/>
        <Grid container spacing={2} sx={{margin:"auto", width:"150px", marginTop:"20px"}}>
          <Button type="submit" onClick={click} variant='contained' fullWidth>INFORME COLECCION</Button>
        </Grid>
        <Grid container spacing={2} sx={{margin:"auto", width:"150px", marginTop:"20px"}}>
          <Button type="submit" onClick={clickUser} variant='contained' fullWidth>INFORME USUARIO</Button>
        </Grid>
        {(puls === true) && (
          <InformeColeccion tabledata={tableData}/>
        )}
        {(pulsUser === true) && (
          <InformeUsuario tabledata={tableData}/>
        )}
    </>
  );
}

export default Reports;
