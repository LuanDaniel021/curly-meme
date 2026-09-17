import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {api} from '../service/api';

function Login() {
  const navigate = useNavigate();

  // Estado para controlar qual aba está ativa ('login' ou 'register')
  const [abaAtiva, setAbaAtiva] = useState('login');

  // Estados para os inputs de login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estados para os inputs de cadastro
  const [nomeReg, setNomeReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [perfilReg, setPerfilReg] = useState('');
  const [senhaReg, setSenhaReg] = useState('');
  const [confirmaSenhaReg, setConfirmaSenhaReg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    api.post('/users/sing-in', { email, senha })
    
    navigate('/c');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Cadastro:', { nomeReg, emailReg, perfilReg, senhaReg });
  };

  return (
        <div className="body-container">

    <div className="auth-container">
      
      <div className="auth-header">
        <h1>Gestão de Frotas</h1>
        <p>Acesse o painel para gerenciar seus veículos e pneus</p>
      </div>

      <div className="card">
        
        {/* Botões das abas com o evento onClick chamando o setAbaAtiva */}
        <div className="tabs">
          <button 
            type="button"
            className={`tab-btn ${abaAtiva === 'login' ? 'active' : ''}`} 
            onClick={() => setAbaAtiva('login')}
          >
            Entrar
          </button>
          
          <button 
            type="button"
            className={`tab-btn ${abaAtiva === 'register' ? 'active' : ''}`} 
            onClick={() => setAbaAtiva('register')}
          >
            Criar Conta
          </button>
        </div>

        {/* Conteúdo da aba de Login */}
        <div className={`tab-content ${abaAtiva === 'login' ? 'active' : ''}`}>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="login_email">E-mail ou Usuário*</label>
              <input 
                id="login_email"
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login_password">Senha*</label>
              <input 
                id="login_password"
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Lembrar de mim
              </label>
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="btn-submit">Acessar Sistema</button>
          </form>
        </div>

        {/* Conteúdo da aba de Cadastro */}
        <div className={`tab-content ${abaAtiva === 'register' ? 'active' : ''}`}>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="reg_nome">Nome Completo*</label>
              <input 
                id="reg_nome" 
                type="text" 
                value={nomeReg} 
                onChange={(e) => setNomeReg(e.target.value)} 
                placeholder="Seu nome" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg_email">E-mail Profissional*</label>
              <input 
                id="reg_email" 
                type="email" 
                value={emailReg} 
                onChange={(e) => setEmailReg(e.target.value)} 
                placeholder="seu@email.com" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg_perfil">Perfil de Acesso*</label>
              <select 
                id="reg_perfil" 
                value={perfilReg} 
                onChange={(e) => setPerfilReg(e.target.value)} 
                required
              >
                <option value="" disabled>Selecione...</option>
                <option value="gestor">Gestor / Administrador</option>
                <option value="borracheiro">Inspetor / Borracheiro</option>
                <option value="motorista">Motorista</option>
              </select>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="reg_senha">Senha*</label>
                <input 
                  id="reg_senha" 
                  type="password" 
                  value={senhaReg} 
                  onChange={(e) => setSenhaReg(e.target.value)} 
                  placeholder="••••••••" 
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg_confirma_senha">Confirmar Senha*</label>
                <input 
                  id="reg_confirma_senha" 
                  type="password" 
                  value={confirmaSenhaReg} 
                  onChange={(e) => setConfirmaSenhaReg(e.target.value)} 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">Cadastrar Conta</button>
          </form>
        </div>

      </div>
      
    </div>
    </div>
  );
}

export default Login;