import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import Input from '../../components/Form/input';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';
export default function Logon() {
  const formRef = useRef(null);
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido.')
      .required('O e-mail é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve conter pelo menos 6 caracteres.'),
  });
  const history = useHistory();

  async function handleLogin(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const { response } = await api.post('sessions', data);
      localStorage.setItem(
        '@bethehero',
        JSON.stringify({
          token: response.token,
          name: response.name,
          expireAt: response.expireAt,
        })
      );
      history.push('/profile');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
        toast.error(
          'Erro na validação dos campos, corrija-os e tente novamente! '
        );
      }else {        
        if (err.response.status === 404) {
          toast.error('Usuario ou senha não encontrados 😕');
        } else {
          toast.error('Parece que algo deu errado, por favor, tente novamente 😕');
        }
      }
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Heroe" />
        <Form ref={formRef} onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <Input placeholder="Seu e-mail" name="email" />
          <Input type="password" placeholder="Sua senha" name="password" />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </Form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
