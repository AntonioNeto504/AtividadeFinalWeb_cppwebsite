import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Importação do ícone

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nomeBusca, setNomeBusca] = useState('');
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '' });
  const [produtosModal, setProdutosModal] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const buscarProdutos = async () => {
    if (!nomeBusca) {
      console.error('Preencha o nome para buscar.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/produtos/buscarPorNome?nome=${nomeBusca}`);
      if (!response.ok) {
        console.error('Erro ao buscar produtos pelo nome:', response.statusText);
        setProdutosModal([]);
        return;
      }
      const data = await response.json();
      setProdutosModal(data);
      setModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar produtos pelo nome:', error);
    }
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();
    if (!novoProduto.nome || !novoProduto.preco) {
      console.error('Nome e preço são obrigatórios');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
      });
      if (response.ok) {
        setNovoProduto({ nome: '', preco: '' });
        fetchProdutos();
      } else {
        console.error('Erro ao adicionar produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  useEffect(() => {
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
        Produtos
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={4}>
        <Paper sx={{ padding: 2, width: '45%' }}>
          <TextField
            label="Buscar por Nome"
            variant="outlined"
            fullWidth
            value={nomeBusca}
            onChange={(e) => setNomeBusca(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={buscarProdutos}
          >
            Buscar
          </Button>
        </Paper>

        <Paper sx={{ padding: 2, width: '45%' }}>
          <Typography variant="h6" gutterBottom>
            Adicionar Produto
          </Typography>
          <form onSubmit={adicionarProduto}>
            <TextField
              label="Nome do Produto"
              variant="outlined"
              fullWidth
              value={novoProduto.nome}
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, nome: e.target.value })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Preço"
              variant="outlined"
              fullWidth
              type="number"
              value={novoProduto.preco}
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, preco: e.target.value })
              }
            />
            <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
              Adicionar
            </Button>
          </form>
        </Paper>
      </Box>

      <Typography variant="h6" gutterBottom>
        Lista de Produtos
      </Typography>
      {produtos.map((produto) => (
        <Paper key={produto.id} sx={{ padding: 2, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
          <ShoppingCartIcon sx={{ marginRight: 2, color: '#1976d2', fontSize: 40 }} />
          <Box>
            <Typography variant="h6">Nome: {produto.nome}</Typography>
            <Typography>Preço: R$ {produto.preco.toFixed(2)}</Typography>
          </Box>
        </Paper>
      ))}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Produtos Encontrados</DialogTitle>
        <DialogContent>
          {produtosModal.length ? (
            produtosModal.map((produto) => (
              <Paper key={produto.id} sx={{ padding: 2, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                <ShoppingCartIcon sx={{ marginRight: 2, color: '#1976d2', fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">Nome: {produto.nome}</Typography>
                  <Typography>Preço: R$ {produto.preco.toFixed(2)}</Typography>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography>Nenhum produto encontrado.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Produtos;
