import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000/api/';

class AdministradorServicio {
    // ADMINISTRAR USUARIOS
    getUsuarios() {
        return axios.get(API_URL + 'apiUsuarios', { headers: authHeader() });
    }
    agregarUsuario(usuario) {
        return axios.post(API_URL + 'apiUsuarios', {
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario.email,
            password: usuario.password,
            password_confirmation: usuario.password_confirmation,
            rol_id: usuario.rol_id
        }, { headers: authHeader() });
    }
    editarUsuario(usuario) {
        return axios.patch(API_URL + 'apiUsuarios/' + usuario.id, {
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            password: usuario.password,
            password_confirmation: usuario.password_confirmation,
            rol_id: usuario.rol_id
        }, { headers: authHeader() });
    }
    // ADMINISTRAR ROLES
    getRoles() {
        return axios.get(API_URL + 'apiRoles', { headers: authHeader() });
    }
    agregarRol(rol) {
        return axios.post(API_URL + 'apiRoles', rol, { headers: authHeader() });
    }
    editarRol(rol) {
        return axios.patch(API_URL + 'apiRoles/' + rol.id, { nombreRol: rol.nombreRol, id: rol.id }, { headers: authHeader() });
    }
    eliminarRol(rol) {
        return axios.delete(API_URL + 'apiRoles/' + rol.id, { headers: authHeader() });
    }
    // ASISGNAR PERMISOS
    asignarPermisos(data) {
        return axios.patch(API_URL + 'apiPermisos/' + data.id, {
            recursos: data.data
        }, { headers: authHeader() });

    }

}

export default new AdministradorServicio();
