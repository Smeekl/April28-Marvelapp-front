import axios from 'axios';
import appConfig from '../config/app.config'

const axiosInstance = axios.create({
    baseURL: `${appConfig.API_URL}`,
});

export default axiosInstance;
