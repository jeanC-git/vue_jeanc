import AdministradorServicio from '../servicios/administrador.servicio';

export const administrador = {
    namespaced: true,
    state: {},
    actions: {
        // ADMINISTRAR USUARIOS
        getUsuarios() {
            return AdministradorServicio.getUsuarios().then(
                response => {
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        agregarUsuario({ commit }, usuario) {
            return AdministradorServicio.agregarUsuario(usuario).then(
                response => {
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        editarUsuario({ commit }, usuario) {
            return AdministradorServicio.editarUsuario(usuario).then(
                response => {
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        // ADMINISTRAR ROLES
        getRoles() {
            return AdministradorServicio.getRoles().then(
                response => {
                    return Promise.resolve(response)
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        agregarRol({ commit }, rol) {
            return AdministradorServicio.agregarRol(rol).then(
                response => {
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        editarRol({ commit }, rol) {
            return AdministradorServicio.editarRol(rol).then(
                response => {
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        eliminarRol({ commit }, rol) {
            return AdministradorServicio.eliminarRol(rol).then(
                response => {
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        // ADMINISTRAR PERMISOS
        asignarPermisos({ commit }, data) {
            return AdministradorServicio.asignarPermisos(data).then(
                response => {
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },

    },
    mutations: {

    }
};
