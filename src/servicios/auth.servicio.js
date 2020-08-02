import axios from 'axios';

const API_URL = ' http://127.0.0.1:8000/api/';

class AuthServicio {
    login(user) {
        return axios
            .post(API_URL + 'auth/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthServicio();
