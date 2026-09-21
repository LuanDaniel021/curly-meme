import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/api';
import styles from './Login.module.css';

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Rota corrigida conforme o Swagger/Documentação da API
      const response = await api.post('/users/singin', { email, senha });
      
      console.log('Login efetuado com sucesso:', response.data);
      navigate('/c');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique seu e-mail e senha.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (senhaReg !== confirmaSenhaReg) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // Enviando os dados para a rota de cadastro correta
      const response = await api.post('/users/singup', {
        nome: nomeReg,
        email: emailReg,
        senha: senhaReg,
      });

      console.log('Cadastro efetuado com sucesso:', response.data);
      alert('Conta criada com sucesso! Faça login para continuar.');
      
      // Muda automaticamente para a aba de login após cadastrar
      setAbaAtiva('login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao criar conta. Verifique os dados informados.');
    }
  };

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.authContainer}>
        
        <div className={styles.authHeader}>
          <h1>Gestão de Frotas</h1>
          <p>Acesse o painel para gerenciar seus veículos e pneus</p>
        </div>

        <div className={styles.card}>
          
          {/* Botões das abas com o evento onClick chamando o setAbaAtiva */}
          <div className={styles.tabs}>
            <button 
              type="button"
              className={`${styles.tabBtn} ${abaAtiva === 'login' ? styles.active : ''}`} 
              onClick={() => setAbaAtiva('login')}
            >
              Entrar
            </button>
            
            <button 
              type="button"
              className={`${styles.tabBtn} ${abaAtiva === 'register' ? styles.active : ''}`} 
              onClick={() => setAbaAtiva('register')}
            >
              Criar Conta
            </button>
          </div>

          {/* Conteúdo da aba de Login */}
          <div className={`${styles.tabContent} ${abaAtiva === 'login' ? styles.active : ''}`}>
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
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

              <div className={styles.formGroup}>
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

              <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" /> Lembrar de mim
                </label>
                <a href="#" className={styles.forgotPassword}>Esqueceu a senha?</a>
              </div>

              <button type="submit" className={styles.btnSubmit}>Acessar Sistema</button>
            </form>
          </div>

          {/* Conteúdo da aba de Cadastro */}
          <div className={`${styles.tabContent} ${abaAtiva === 'register' ? styles.active : ''}`}>
            <form onSubmit={handleRegister}>
              <div className={styles.formGroup}>
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

              <div className={styles.formGroup}>
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

              <div className={styles.formGroup}>
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

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
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
                <div className={styles.formGroup}>
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

              <button type="submit" className={styles.btnSubmit}>Cadastrar Conta</button>
            </form>
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default Login;