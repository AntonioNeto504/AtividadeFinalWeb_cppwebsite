// apiService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // ou o seu endpoint
});

export const fetchClientes = () => api.get('/clientes');
export const fetchProdutos = () => api.get('/produtos');
export const fetchPedidos = () => api.get('/pedidos');
export const createCliente = (data) => api.post('/clientes', data);
export const createPedido = (data) => api.post('/pedidos', data);
export const createProduto = (data) => api.post('/produtos', data);

export default api;
