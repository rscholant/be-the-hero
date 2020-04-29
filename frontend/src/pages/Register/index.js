import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import Input from '../../components/Form/input';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Register() {
  const formRef = useRef(null);
  const history = useHistory();
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    email: Yup.string()
      .email('Digite um e-mail válido.')
      .required('O e-mail é obrigatório.'),
    whatsapp: Yup.string()
      .required('O whatsapp é obrigatório.')
      .min(10, 'O whatsapp deve conter mais de 10 caracteres.')
      .max(11, 'O whatsapp não pode conter mais de 11 caracteres.'),
    city: Yup.string().required('A cidade é obrigatório.'),
    uf: Yup.string()
      .required('A UF é obrigatória.')
      .length(2, 'A UF deve conter apenas 2 caracteres.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve conter pelo menos 6 caracteres.'),
    confirmPassword: Yup.string()
      .required('A confirmação da senha é obrigatória')
      .test('passwords-match', 'As senhas devem ser identicas.', function(value) {
        return this.parent.password === value;
      })
  });
  async function handleRegister(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('ongs', data);

      toast.success(`yayy! Seja bem-vinda ${data.name} 🦄`)

      history.push('/');
    } catch (err) {
      console.log(err)
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
        toast.error(
          'Erro na validação dos campos, corrija-os e tente novamente! '
        );
      } else {
        toast.error(
          'Parece que algo deu errado, por favor, tente novamente 😕'
        );
      }
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude as pessoas a
            encontrarem os casos de sua ONG.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para o logon
          </Link>
        </section>
        <Form ref={formRef} onSubmit={handleRegister}>
          <Input placeholder="Nome da ONG" name="name" />
          <Input type="email" placeholder="Email" name="email" />
          <Input placeholder="Whatsapp" name="whatsapp" />
          <div className="input-group">
            <Input placeholder="Cidade" name="city" />
            <Input placeholder="UF" style={{ width: 80 }} name="uf" />
          </div>
          <Input type="password" placeholder="Senha" name="password" />
          <Input type="password" placeholder="Confirme sua senha" name="confirmPassword" />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </div>
    </div>
  );
}
