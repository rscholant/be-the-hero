import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';
export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('sessions', { email, password });
      localStorage.setItem(
        '@bethehero',
        JSON.stringify({
          token: data.token,
          name: data.name,
          expireAt: data.expireAt,
        })
      );
      history.push('/profile');
    } catch (error) {
      alert('Falha no login, tente novamente.');
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Heroe" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
