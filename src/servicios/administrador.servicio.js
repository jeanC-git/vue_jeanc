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
            rol_id: usuario.rol_id,
            estado: usuario.estado,
        }, { headers: authHeader() });
    }
    editarUsuario(usuario) {
        return axios.patch(API_URL + 'apiUsuarios/' + usuario.id, {
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            password: usuario.password,
            password_confirmation: usuario.password_confirmation,
            rol_id: usuario.rol_id,
            estado: usuario.estado,
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
    // GET PERMISOS X ROL
    getPermisosxRol(id) {
        return axios.get(API_URL + 'apiRecursos/' + id.id, { headers: authHeader() });
    }
    // ADMINISTRAR MODULOS
    getModulos() {
        return axios.get(API_URL + 'apiModulos', { headers: authHeader() });
    }
    agregarModulos(modulo) {
        return axios.post(API_URL + 'apiModulos', {
            nombreModulo: modulo.nombreModulo,
            ruta: modulo.ruta,
            operaciones: modulo.operaciones
        }, { headers: authHeader() });
    }
    // ADMINISTRAR PERMISOS Y OPERACIONES
    getPermisosYOperaciones(data) {
        return axios.get(API_URL + 'apiPermisosYOperaciones/' + data.rol_id + '_' + data.modulo_id, { headers: authHeader() });
    }
}

export default new AdministradorServicio();
