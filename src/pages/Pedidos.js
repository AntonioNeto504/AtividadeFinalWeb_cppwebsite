import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteBusca, setClienteBusca] = useState('');
  const [produtoBusca, setProdutoBusca] = useState('');
  const [novoPedido, setNovoPedido] = useState({ idCliente: '', idsProdutos: [] });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:8080/pedidos');
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:8080/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const buscarPedidosPorCliente = async () => {
    if (!clienteBusca) {
      console.error('Preencha o ID do cliente para buscar.');
      return;
    }
    try {
      console.log("Buscando pedidos para o cliente com ID:", clienteBusca); // Verifique o valor do clienteBusca
      const response = await fetch(`http://localhost:8080/pedidos/buscarPorCliente/${clienteBusca}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
      }
      const data = await response.json();
      setPedidosFiltrados(data);
      setIsModalOpen(true); 
    } catch (error) {
      console.error('Erro ao buscar pedidos por cliente:', error.message);
    }
  };
  

  const buscarPedidosPorProduto = async () => {
    if (!produtoBusca) {
      console.error('Preencha o ID do produto para buscar.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/pedidos/buscarPorProduto/${produtoBusca}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
      }
      const data = await response.json();
      setPedidosFiltrados(data);
      setIsModalOpen(true); 
    } catch (error) {
      console.error('Erro ao buscar pedidos por produto:', error.message);
    }
  };

  const adicionarPedido = async (e) => {
    e.preventDefault();
    if (!novoPedido.idCliente || novoPedido.idsProdutos.length === 0) {
      console.error('Cliente e produtos são obrigatórios');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPedido),
      });
      if (response.ok) {
        setNovoPedido({ idCliente: '', idsProdutos: [] });
        fetchPedidos();
      } else {
        console.error('Erro ao adicionar pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
    }
  };

  useEffect(() => {
    fetchPedidos();
    fetchClientes();
    fetchProdutos();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', mb: 4, color: '#1E3A8A' }} // Azul escuro para título
      >
        Pedidos
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box width="48%">
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              backgroundColor: '#fffff',
              boxShadow: 2,
            }}
          >
            <TextField
              label="Buscar por ID do Cliente"
              variant="outlined"
              fullWidth
              value={clienteBusca}
              onChange={(e) => setClienteBusca(e.target.value)}
              sx={{ width: '80%' }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': { backgroundColor: '#1565c0' },
                paddingX: 4,
              }}
              onClick={buscarPedidosPorCliente}
            >
              Buscar
            </Button>
          </Paper>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 2,
              backgroundColor: '#fffff',
              boxShadow: 2,
            }}
          >
            <TextField
              label="Buscar por ID do Produto"
              variant="outlined"
              fullWidth
              value={produtoBusca}
              onChange={(e) => setProdutoBusca(e.target.value)}
              sx={{ width: '80%' }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': { backgroundColor: '#1565c0' },
                paddingX: 4,
              }}
              onClick={buscarPedidosPorProduto}
            >
              Buscar
            </Button>
          </Paper>
        </Box>

        <Box width="48%">
          <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4, backgroundColor: '#fffff' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Adicionar Novo Pedido
            </Typography>
            <form onSubmit={adicionarPedido}>
              <Box display="flex" flexDirection="column" gap={2}>
                <FormControl required>
                  <InputLabel>Cliente</InputLabel>
                  <Select
                    value={novoPedido.idCliente}
                    onChange={(e) => setNovoPedido({ ...novoPedido, idCliente: e.target.value })}
                    fullWidth
                  >
                    {clientes?.map((cliente) => (
                      <MenuItem key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl required>
                  <InputLabel>Produtos</InputLabel>
                  <Select
                    multiple
                    value={novoPedido.idsProdutos}
                    onChange={(e) => setNovoPedido({ ...novoPedido, idsProdutos: e.target.value })}
                    fullWidth
                  >
                    {produtos?.map((produto) => (
                      <MenuItem key={produto.id} value={produto.id}>
                        {produto.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    paddingX: 3,
                    paddingY: 1,
                    mt: 2,
                    borderRadius: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                    textTransform: 'uppercase',
                  }}
                >
                  Adicionar Pedido
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#2e3b4e' }}>
        Lista de Pedidos
      </Typography>
      <Box>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <Paper
              key={pedido.id}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: '#ffffff',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                Pedido ID: {pedido.id}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Cliente: {pedido.cliente?.nome}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Produtos: {pedido.produtos?.map((p) => p.nome).join(', ')}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: '#888' }}>
            Nenhum pedido encontrado.
          </Typography>
        )}
      </Box>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Pedidos Filtrados</DialogTitle>
        <DialogContent>
          <Box>
            {pedidosFiltrados?.length > 0 ? (
              pedidosFiltrados.map((pedido) => (
                <Paper key={pedido.id} sx={{ padding: 2, marginBottom: 2, borderRadius: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Pedido ID: {pedido.id}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Cliente: {pedido.cliente?.nome}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    Produtos: {pedido.produtos?.map((p) => p.nome).join(', ')}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: '#888' }}>
                Nenhum pedido encontrado para este filtro.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Pedidos;
