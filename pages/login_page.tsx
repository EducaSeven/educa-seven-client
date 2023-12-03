// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticação - substitua isso pela sua lógica real
    // Em seguida, redirecione para a página desejada após o login
    router.push('/página-desejada');
  };

  return (
    <div className="container">
      <style jsx>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #1F2328; // Cor de fundo
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .login-container {
          text-align: center;
          background-color: #1F2328; // Mesma cor de fundo do body
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .company-name {
          color: #FFF;
          text-align: center;
          font-family: 'Lexend Deca', sans-serif;
          font-size: 64px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .login-text {
          color: #FFF;
          text-align: center;
          font-family: 'Lexend Deca', sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .form-group {
          margin: 20px auto;
          text-align: center;
        }

        input {
          width: 300px;
          height: 45px;
          flex-shrink: 0;
          border: none;
          border-radius: 10px;
          background: #FFF;
          padding: 10px;
          margin-bottom: 20px;
          color: #1F2328; // Cor do texto nos campos
          font-family: 'Lexend Deca', sans-serif;
        }

        ::placeholder {
          color: #1F2328; // Cor do placeholder nos campos
        }

        .remember-forgot-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .remember-me {
          color: #FFF;
          font-family: 'Montserrat', sans-serif;
        }

        .remember-me-checkbox {
          width: 18px;
          height: 17px;
          flex-shrink: 0;
          border-radius: 5px;
          background: #FFF;
        }

        .forgot-password {
          color: #FFF;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }

        button {
          background-color: #4caf50;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-family: 'Lexend Deca', sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          text-transform: capitalize;
        }
      `}</style>
      <div className="login-container">
        <div className="company-name">Educa7</div>
        <div className="login-text">Faça seu login e comece a planejar suas aulas!</div>
        <form>
          <div className="form-group">
            <input
              type="text"
              placeholder="Digite seu email aqui"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Digite sua senha aqui"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-forgot-container">
            <div className="remember-me">
              <label>
                <input
                  className="remember-me-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Lembrar de mim
              </label>
            </div>
            <a className="forgot-password" href="/forgot-password">
              Esqueceu a Senha?
            </a>
          </div>

          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
