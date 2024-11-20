import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    Autenticado: boolean,
    nombreUsuario: string,
    Rol: string
}

const initialAuthState: AuthState = {
    Autenticado: false,
    nombreUsuario: '',
    Rol: ''
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: (state,action) => {
            const userData = action.payload
            state.Autenticado = true
            state.nombreUsuario = userData.nombreUsuario
            state.Rol = userData.rol
        },

        logout: (state) => {
            state = initialAuthState
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer
