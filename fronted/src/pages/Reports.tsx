import React, { useState} from 'react';
import Menu from '../components/Menu';
import InformeColeccion from '../components/InformeColeccion';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import Tooltip from '@mui/material/Tooltip';

function Reports() {
  const [tableData, setTableData] = useState([])
  const [puls, setpuls] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3030/getItems`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
      });
  }, []);

  const click = () => {
    setpuls(true);
  };

  return (
    <>
        <Menu/>
        <Grid container spacing={2} sx={{margin:"auto", width:"150px", marginTop:"20px"}}>
        <Tooltip title="Informe coleccion" arrow placement="bottom">
          <Button type="submit" onClick={click} variant='contained' fullWidth>INFORME COLECCION</Button>
        </Tooltip>
        </Grid>
        {(puls === true) && (
          <InformeColeccion tabledata={tableData}/>
        )} 
    </>
  );
}

export default Reports;