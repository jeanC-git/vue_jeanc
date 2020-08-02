import AuthServicio from '../servicios/auth.servicio';

const user = JSON.parse(localStorage.getItem('user'));
const estadoinicial = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: estadoinicial,
    actions: {
        login({ commit }, user) {
            return AuthServicio.login(user).then(
                user => {
                    commit('loginOk', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginError');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthServicio.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthServicio.register(user).then(
                response => {
                    commit('registroExitoso');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registroError');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginOk(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginError(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registroExitoso(state) {
            state.status.loggedIn = false;
        },
        registroError(state) {
            state.status.loggedIn = false;
        }
    }
};
