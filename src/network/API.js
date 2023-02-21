import axios from 'axios'
import config from '../config.js'

const instance = axios.create({
    baseURL: config.WS_BASE_URL,
});

instance.interceptors.request.use(async(config)=>{
    const token = localStorage.getItem('token');
    config.headers.Authorization = (token ? `Bearer ${token}` : '');
    config.headers.ContentType = 'application/json';
    return config
})

export const login = async (email,password) => (
    await instance.post('login',{username:email,password:password})
)