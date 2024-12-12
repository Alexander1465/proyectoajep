import React from 'react'
import Login from "./pages/Login"
import Home from './pages/Home'
import Reports from './pages/Reports'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Error from "./pages/Error";
import Gestion from './pages/Gestion';
import GestionPrestamo from './pages/GestionPrestamo';


const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: 'Home',
        element: <Home/>
      },
      {
        path: 'Reports',
        element: <Reports/>
      },
      {
        path: 'Gestion',
        element: <Gestion/>
      },
      {
        path: 'GestionPrestamo',
        element: <GestionPrestamo/>
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App
