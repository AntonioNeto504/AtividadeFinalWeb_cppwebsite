import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-white">
            {/* Header */}
            <header
                className="py-5 text-center text-white"
                style={{
                    backgroundImage: 'linear-gradient(to right, #007bff, #6610f2)',
                    minHeight: '60vh',
                }}
            >
                <div className="container">
                    <h1 className="display-4 fw-bold">Bem-vindo ao CPP Cadastro</h1>
                    <p className="lead">Gerencie seus clientes, produtos e pedidos de forma simples e eficaz</p>
                    <Link to="/clientes" className="btn btn-lg btn-light mt-4">
                        Começar Agora
                    </Link>
                </div>
            </header>

            {/* Serviços */}
            <section className="py-5 bg-dark">
                <div className="container">
                    <h2 className="text-center text-uppercase fw-bold mb-4">Nossos Serviços</h2>
                    <div className="row">
                        {/* Card de Cadastro de Clientes */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <Link to="/clientes" className="card bg-secondary border-0 text-white text-center shadow h-100">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Cadastro de Clientes</h5>
                                    <p className="card-text">Gerenciamento de clientes eficiente e prático.</p>
                                </div>
                            </Link>
                        </div>
                        
                        {/* Card de Cadastro de Produtos */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <Link to="/produtos" className="card bg-secondary border-0 text-white text-center shadow h-100">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Cadastro de Produtos</h5>
                                    <p className="card-text">Controle de produtos com alta precisão.</p>
                                </div>
                            </Link>
                        </div>
                        
                        {/* Card de Cadastro de Pedidos */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <Link to="/pedidos" className="card bg-secondary border-0 text-white text-center shadow h-100">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">Cadastro de Pedidos</h5>
                                    <p className="card-text">Gestão de pedidos para otimizar seu negócio.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-center text-white py-4 mt-auto">
                <p className="mb-0">&copy; 2024 CPP Cadastro. Todos os direitos reservados.</p>
                <p>Desenvolvido com 💻 e ☕</p>
            </footer>
        </div>
    );
};

export default Home;
