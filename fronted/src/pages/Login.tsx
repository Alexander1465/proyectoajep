import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'
import Home from './Home';
import { authActions } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function Login() {
    const [data, setData] = React.useState({
        usuario: '', 
        constrasena: '',
        verific: 0,     
     });

      const bduser ='alexander'
      const bdpasswd ='1234'
      const navigate = useNavigate()
      const dispatch = useDispatch()


      const handleSubmit = (e:any) => {
        e.preventDefault()
        fetch(`http://localhost:3030/login?user=${data.usuario}&password=${data.constrasena}`)
            .then(response => response.json())
            .then (response => {
            console.log("Lo que nos llega de la base de datos: ")
            console.log(response.data)
        if(response.data.length !== 0) {
          dispatch(authActions.login( {
            nombreUsuario: data.usuario,
            rol: 'administrador'
          }))
          navigate("/Home")
        }else {
          console.log("usuario/contraseña son incorrectas ")
        }
      })
    }

 return (
  <Container sx={{justifyContent:'center', alignItems:'center', display: 'flex'}}>
    <Box onSubmit={handleSubmit} sx={{ padding: '20px', width: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} component="form">
        <Typography variant='h5'>Sistema de Acceso</Typography>
          <LockOpenIcon />
          <TextField
              required
              fullWidth
              label="usuario"
              value={data.usuario}
              onChange={(e) => setData({ ...data, usuario: e.target.value })}
          />
          <TextField
              required
              fullWidth
              label="constraseña"
              type='password'
              value={data.constrasena}
              onChange={(e) => setData({ ...data, constrasena: e.target.value })}
              />
          <Button variant='contained' fullWidth type='submit'>Acceder</Button>
          { data.verific !== 0 && (
              data.verific === 1 ? (
                  <Alert severity="success">Acceso concedido</Alert>
              ) : (
                  <Alert severity="error">Usuario o contraseña incorrectos</Alert>
              )
          )
        }
    </Box>
  </Container>
 )
}

export default Login;