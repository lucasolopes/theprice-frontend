import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThePriceGame = () => {
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get('https://theprice.onrender.com/api/Challenges');
        setChallenge(response.data.challenge);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchChallenge();
  }, []);

  const handleAccept = () => {
    alert('Você aceitou o desafio por 50 milhões de dólares!');
    // Aqui você pode adicionar lógica para avançar para o próximo desafio
  };

  const handleDecline = () => {
    alert('Você recusou o desafio.');
    // Aqui você pode adicionar lógica para avançar para o próximo desafio
  };

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