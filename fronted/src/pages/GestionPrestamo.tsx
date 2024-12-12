import React, { useState} from 'react';
import Menu from '../components/Menu';
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { RootState } from '../store/index';
import { useSelector } from 'react-redux';

function GestionPrestamo() {
    interface itemtype {
        id?: number
        articulo: string
        persona: string
        fecha: string
      }
    
      const itemInitialState: itemtype = {
        articulo: '',
        persona: '',
        fecha: '',
      }
  
      const [item, setItem] = useState(itemInitialState)
      const [tableData, setTableData] = useState([])
      const userData = useSelector((state: RootState) => state.authenticator)

      useEffect(() => {
        fetch(`http://localhost:3030/getItemsPrestamo`)
        .then((response) => response.json())
        .then((response) => {
          setTableData(response.data);
        });
      },[])

      const handleSubmit = (e:any) => {
        e.preventDefault();  
        fetch(`http://localhost:3030/addItemPrestamo?articulo=${item.articulo}&persona=${item.persona}&fecha=${item.fecha}`)
          .then(response => response.json())
          .then (response => {
            if(response > 0) {
              alert("Datos guardados")
              fetch(`http://localhost:3030/getItemsPrestamo`)
                .then((response) => response.json())
                .then((response) => {
                setTableData(response.data);
            });
            }else {
              alert("Los datos no se han guardado")
            }
          })
      }

  return (
    <>
      <Menu />
      {(userData.Rol === 'admin') && (
      <Box component='form'  onSubmit={handleSubmit} sx={{marginTop:"20px"}} >
            <Grid container spacing={2}>
                <Grid  size={{xs:6, sm:2, md:2}}>
                    <TextField
                        label="Articulo"
                        value={item.articulo}
                        fullWidth
                        onChange={(e:any) => setItem({...item, articulo: e.target.value })}
                        required
                    />
                </Grid>
                <Grid  size={{xs:6, sm:2, md:2}}>
                    <TextField
                        label="Persona"
                        value={item.persona}
                        fullWidth
                        onChange={(e:any) => setItem({...item, persona: e.target.value })}
                        required
                    />
                </Grid>
                <Grid  size={{xs:6, sm:2, md:2}}>
                    <TextField
                        label="Fecha"
                        value={item.fecha}
                        type='date'
                        fullWidth
                        onChange={(e:any) => setItem({...item, fecha: e.target.value })}
                        required
                    />
                </Grid>
                <Button type="submit" variant='outlined' fullWidth>+ INSERTAR DATOS</Button>
            </Grid>
        </Box>
        )}

        <TableContainer sx={{marginTop:"20px"}}>
        <Table aria-label="Tabla">
            <TableHead >
            <TableRow>
                <TableCell>Articulo</TableCell>
                <TableCell>Persona</TableCell>
                <TableCell>Fecha</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row: itemtype) => (
                <TableRow key={row.id}>
                <TableCell>{row.articulo}</TableCell>
                <TableCell>{row.persona}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
  );
}

export default GestionPrestamo;