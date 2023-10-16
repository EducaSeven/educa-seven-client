import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Adicione a lógica de autenticação aqui
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2>Entrar</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={styles.inputSpace}></div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button onClick={handleLogin} style={styles.loginButton}>Entrar</button>
          <button style={styles.registerButton}>Cadastrar-se</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#00253A',
  },
  loginBox: {
    padding: '20px',
    border: '1px solid #03A4FF', // Cor da borda da caixa de login
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    backgroundColor: '#00253A',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px 0',
  },
  inputSpace: {
    height: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: '#00253A',
    color: 'white',
  },
  registerButton: {
    backgroundColor: '#00253A',
    color: 'white',
  },
};

export default Login;
