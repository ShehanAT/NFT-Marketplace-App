import axios from 'axois';
import process from 'process';

export const api = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3333'
});