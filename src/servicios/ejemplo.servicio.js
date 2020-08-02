import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class EjemploService {
    //SIN HEADER
    getSinHeader() {
        return axios.get(API_URL + 'ejemplo');
    }
    //CON HEADER
    getConHeader() {
        return axios.get(API_URL + 'ejemplo', { headers: authHeader() });
    }

}

export default new EjemploService();
