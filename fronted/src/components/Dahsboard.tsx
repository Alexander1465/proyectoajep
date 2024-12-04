import React, { useState} from 'react';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import DeleteForeverIcon from '@mui/icons-material/Delete';

function Dahsboard() {
    interface itemtype {
      id?: number
      nombre: string
      marca: string
      tipo: string
      precio: number
    }
  
    const itemInitialState: itemtype = {
      nombre: '',
      marca: '',
      tipo: '',
      precio: 0
    }

    const [item, setItem] = useState(itemInitialState)
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3030/getItems`)
        .then((response) => response.json())
        .then((response) => {
          setTableData(response.data);
        });
      },[])

      const handleSubmit = (e:any) => {
        e.preventDefault();  
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
          .then(response => response.json())
          .then (response => {
            if(response > 0) {
              alert("Datos guardados")
              fetch(`http://localhost:3030/getItems`)
                .then((response) => response.json())
                .then((response) => {
                setTableData(response.data);
            });
            }else {
              alert("Los datos no se han guardado")
            }
          })
      }

      const handleDeleteItem = (item: itemtype) => {
        fetch(`http://localhost:3030/deleteItem?id=${item.id}`)
          .then(response => response.json())
          .then((response) => {
            if (response > 0) {
              alert("Elemento eliminado");
              fetch(`http://localhost:3030/getItems`)
                .then((response) => response.json())
                .then((response) => {
                setTableData(response.data);
            });
            } else {
              alert("Error al eliminar elemento");
            }
          })
          .catch((error) => {
            console.error("Error en la eliminación:", error);
          });
      };

    return (
    <>
        <Box component='form' onSubmit={handleSubmit} sx={{marginTop:"20px"}} >
            <Grid container spacing={2}>
                <Grid  size={{xs:6, sm:3, md:3}}>
                    <TextField
                        label="Nombre"
                        value={item.nombre}
                        fullWidth
                        onChange={(e:any) => setItem({...item, nombre: e.target.value })}
                        required
                    />
                </Grid>
                <Grid  size={{xs:6, sm:3, md:3}}>
                    <TextField
                        label="Marca"
                        value={item.marca}
                        fullWidth
                        onChange={(e:any) => setItem({...item, marca: e.target.value })}
                        required
                    />
                </Grid>
                <Grid  size={{xs:6, sm:3, md:3}}>
                    <TextField
                        label="Tipo"
                        value={item.tipo}
                        fullWidth
                        onChange={(e:any) => setItem({...item, tipo: e.target.value })}
                        required
                    />
                </Grid>
                <Grid  size={{xs:6, sm:3, md:3}}>
                    <TextField
                        label="Precio"
                        value={item.precio}
                        fullWidth
                        onChange={(e:any) => setItem({...item, precio: e.target.value })}
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
                <TableCell></TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Precio</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row: itemtype) => (
                <TableRow key={row.id}>
                <TableCell>
                    <Button onClick={() => handleDeleteItem(row)}>
                    <DeleteForeverIcon/>
                    </Button>
                </TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.tipo}</TableCell>
                <TableCell>{row.precio}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
    );
    }

    export default Dahsboard;