// src/components/ThePriceGame.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThePriceGame = () => {
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar o desafio da API
  const fetchChallenge = async () => {
    setLoading(true); // Ativa o estado de carregamento
    setError(null); // Limpa erros anteriores
    try {
      const response = await axios.get('https://theprice.onrender.com/api/Challenges');
      setChallenge(response.data.challenge);
    } catch (err) {
      setError(err.message); // Define o erro, se houver
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Busca o primeiro desafio ao carregar o componente
  useEffect(() => {
    fetchChallenge();
  }, []);

  // Função para lidar com a aceitação do desafio
  const handleAccept = () => {
    alert('Você aceitou o desafio por 50 milhões de dólares!');
    fetchChallenge(); // Busca um novo desafio
  };

  // Função para lidar com a recusa do desafio
  const handleDecline = () => {
    alert('Você recusou o desafio.');
    fetchChallenge(); // Busca um novo desafio
  };

  // Exibe mensagens de carregamento ou erro
  if (loading) return <div>Carregando desafio...</div>;
  if (error) return <div>Erro ao carregar o desafio: {error}</div>;

  return (
    <div>
      <h1>The Price</h1>
      <p>{challenge}</p>
      <button onClick={handleAccept}>Faria por 50 milhões</button>
      <button onClick={handleDecline}>Não faria</button>
    </div>
  );
};

export default ThePriceGame;