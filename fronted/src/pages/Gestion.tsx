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
import DeleteForeverIcon from '@mui/icons-material/Delete';

function Gestion() {
    interface itemtype {
        id?: number
        nombre: string
        login: string
        password: number
        rol: string
      }
    
      const itemInitialState: itemtype = {
        nombre: '',
        login: '',
        password: 0,
        rol: ''
      }
  
      const [item, setItem] = useState(itemInitialState)
      const [tableData, setTableData] = useState([])

      useEffect(() => {
        fetch(`http://localhost:3030/getItemsRol`)
        .then((response) => response.json())
        .then((response) => {
          setTableData(response.data);
        });
      },[])

      const handleSubmit = (e:any) => {
        e.preventDefault();  
        fetch(`http://localhost:3030/addItemRol?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
          .then(response => response.json())
          .then (response => {
            if(response > 0) {
              alert("Datos guardados")
              fetch(`http://localhost:3030/getItemsRol`)
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
      <Box component='form'  onSubmit={handleSubmit} sx={{marginTop:"20px"}} >
            <Grid container spacing={2}>
                <Grid  size={{xs:6, sm:2, md:2}}>
                    <TextField
                        label="Nombre"
                        value={item.nombre}
                        fullWidth
                        onChange={(e) => setItem({...item, nombre: e.target.value })}
                        required
                    />
                </Grid>
                <Grid  size={{xs:6, sm:2, md:2}}>
                    <TextField
                        label="Login"
                        value={item.login}
                        fullWidth
                        onChange={(e) => setItem({...item, login: e.target.value })}
                        required
                    />
                </Grid>
                <Grid  size={{xs:6, sm:2, md:2}}>
                    <TextField
                        label="Password"
                        value={item.password}
                        fullWidth
                        onChange={(e) => setItem({...item, password: parseFloat(e.target.value) })}
                        required
                    />
                </Grid>
                <Grid  size={{xs:6, sm:2, md:2}}>
                    <TextField
                        label="Rol"
                        value={item.rol}
                        fullWidth
                        onChange={(e) => setItem({...item, rol: e.target.value })}
                        required
                    />
                </Grid>
                <Button type="submit" variant='outlined' fullWidth>+ INSERTAR DATOS</Button>
            </Grid>
        </Box>

        <TableContainer sx={{marginTop:"20px"}}>
        <Table aria-label="Tabla">
            <TableHead >
            <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Login</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Rol</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row: itemtype) => (
                <TableRow key={row.id}>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.login}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{row.rol}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
}

export default Gestion;