import { useState } from 'react';

export default function GerenciamentoUsuarios() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalTitulo, setModalTitulo] = useState('Novo Usuário');
  
  const [usrNome, setUsrNome] = useState('');
  const [usrEmail, setUsrEmail] = useState('');
  const [usrPerfil, setUsrPerfil] = useState('gestor');
  const [usrStatus, setUsrStatus] = useState('active');
  const [usrSenha, setUsrSenha] = useState('');

  const abrirModalNovo = () => {
    setModalTitulo('Novo Usuário');
    setUsrNome('');
    setUsrEmail('');
    setUsrPerfil('gestor');
    setUsrStatus('active');
    setUsrSenha('');
    setModalAberto(true);
  };

  const abrirModalEditar = (nome: string, email: string, perfil: string) => {
    setModalTitulo('Editar Usuário');
    setUsrNome(nome);
    setUsrEmail(email);
    setUsrPerfil(perfil);
    setUsrStatus('active');
    setUsrSenha('');
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const bloquearUsuario = (nome: string) => {
    if (window.confirm(`Tem certeza que deseja bloquear o usuário ${nome}?`)) {
      alert(`Usuário ${nome} foi bloqueado.`);
    }
  };

  const desbloquearUsuario = (nome: string) => {
    alert(`Acesso do usuário ${nome} foi reestabelecido.`);
  };

  const ativarUsuario = (nome: string) => {
    alert(`Usuário ${nome} foi ativado com sucesso!`);
  };

  const resetSenha = (nome: string) => {
    alert(`Um link de redefinição de senha foi enviado para ${nome}.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ usrNome, usrEmail, usrPerfil, usrStatus, usrSenha });
    fecharModal();
  };

  return (
    <div className="container">
      
      <div className="header-title">
        <div>
          <h1>Gerenciamento de Usuários</h1>
          <div className="subtitle">Controle de contas, permissões e status de acesso ao sistema de frotas</div>
        </div>
        <button className="btn btn-primary" onClick={abrirModalNovo}>+ Novo Usuário</button>
      </div>

      {/* CARDS DE MÉTRICAS */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="label">Total de Usuários</div>
          <div className="value">24</div>
        </div>
        <div className="summary-card">
          <div className="label">Usuários Ativos</div>
          <div className="value" style={{ color: 'var(--success)' }}>20</div>
        </div>
        <div className="summary-card">
          <div className="label">Pendentes / Novos</div>
          <div className="value" style={{ color: 'var(--warning)' }}>3</div>
        </div>
        <div className="summary-card">
          <div className="label">Bloqueados</div>
          <div className="value" style={{ color: 'var(--danger)' }}>1</div>
        </div>
      </div>

      {/* TABELA DE USUÁRIOS */}
      <div className="card">
        <div className="table-toolbar">
          <div className="search-box">
            <input type="text" className="filter-input" placeholder="Buscar por nome, e-mail ou cargo..." />
            <select className="filter-input" style={{ width: '160px' }} defaultValue="all">
              <option value="all">Todos Perfis</option>
              <option value="gestor">Gestores</option>
              <option value="borracheiro">Borracheiros</option>
              <option value="motorista">Motoristas</option>
            </select>
          </div>
          <select className="filter-input" style={{ width: '150px' }} defaultValue="all">
            <option value="all">Todos Status</option>
            <option value="active">Ativos</option>
            <option value="pending">Pendentes</option>
            <option value="blocked">Bloqueados</option>
          </select>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Perfil de Acesso</th>
              <th>Último Acesso</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* LINHA 1 */}
            <tr>
              <td>
                <div className="user-cell">
                  <div className="user-avatar">CE</div>
                  <div className="user-details">
                    <span className="user-name">Carlos Eduardo</span>
                    <span className="user-email">carlos.eduardo@empresa.com</span>
                  </div>
                </div>
              </td>
              <td><span className="role-tag">Gestor / Admin</span></td>
              <td>16/09/2026 14:10</td>
              <td><span className="badge badge-active">Ativo</span></td>
              <td>
                <div className="action-btns">
                  <button className="btn btn-action" onClick={() => abrirModalEditar('Carlos Eduardo', 'carlos.eduardo@empresa.com', 'gestor')}>Editar</button>
                  <button className="btn btn-action" onClick={() => resetSenha('Carlos Eduardo')}>Senha</button>
                  <button className="btn btn-danger" onClick={() => bloquearUsuario('Carlos Eduardo')}>Bloquear</button>
                </div>
              </td>
            </tr>

            {/* LINHA 2 */}
            <tr>
              <td>
                <div className="user-cell">
                  <div className="user-avatar" style={{ color: 'var(--warning)' }}>MT</div>
                  <div className="user-details">
                    <span className="user-name">Mariana Torres</span>
                    <span className="user-email">mariana.torres@empresa.com</span>
                  </div>
                </div>
              </td>
              <td><span className="role-tag">Inspetora / Borracheira</span></td>
              <td>15/09/2026 09:30</td>
              <td><span className="badge badge-active">Ativo</span></td>
              <td>
                <div className="action-btns">
                  <button className="btn btn-action" onClick={() => abrirModalEditar('Mariana Torres', 'mariana.torres@empresa.com', 'borracheiro')}>Editar</button>
                  <button className="btn btn-action" onClick={() => resetSenha('Mariana Torres')}>Senha</button>
                  <button className="btn btn-danger" onClick={() => bloquearUsuario('Mariana Torres')}>Bloquear</button>
                </div>
              </td>
            </tr>

            {/* LINHA 3 */}
            <tr>
              <td>
                <div className="user-cell">
                  <div className="user-avatar" style={{ color: 'var(--success)' }}>RL</div>
                  <div className="user-details">
                    <span className="user-name">Roberto Lima</span>
                    <span className="user-email">roberto.lima@empresa.com</span>
                  </div>
                </div>
              </td>
              <td><span className="role-tag">Motorista</span></td>
              <td>14/09/2026 18:45</td>
              <td><span className="badge badge-pending">Pendente</span></td>
              <td>
                <div className="action-btns">
                  <button className="btn btn-action" style={{ backgroundColor: 'var(--success)', color: '#000' }} onClick={() => ativarUsuario('Roberto Lima')}>Ativar</button>
                  <button className="btn btn-action" onClick={() => abrirModalEditar('Roberto Lima', 'roberto.lima@empresa.com', 'motorista')}>Editar</button>
                </div>
              </td>
            </tr>

            {/* LINHA 4 */}
            <tr>
              <td>
                <div className="user-cell">
                  <div className="user-avatar" style={{ color: 'var(--danger)' }}>FS</div>
                  <div className="user-details">
                    <span className="user-name">Fernando Souza</span>
                    <span className="user-email">fernando.souza@empresa.com</span>
                  </div>
                </div>
              </td>
              <td><span className="role-tag">Motorista</span></td>
              <td>01/08/2026 11:20</td>
              <td><span className="badge badge-blocked">Bloqueado</span></td>
              <td>
                <div className="action-btns">
                  <button className="btn btn-action" onClick={() => desbloquearUsuario('Fernando Souza')}>Desbloquear</button>
                  <button className="btn btn-action" onClick={() => abrirModalEditar('Fernando Souza', 'fernando.souza@empresa.com', 'motorista')}>Editar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL DE CADASTRO E EDIÇÃO */}
      <div className={`modal-overlay ${modalAberto ? 'active' : ''}`} id="modalUsuario">
        <div className="modal">
          <div className="modal-header">
            <h3>{modalTitulo}</h3>
            <button className="close-modal" onClick={fecharModal}>✕</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usr_nome">Nome Completo*</label>
              <input 
                type="text" 
                id="usr_nome" 
                name="nome" 
                value={usrNome} 
                onChange={(e) => setUsrNome(e.target.value)} 
                placeholder="Ex: João da Silva" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="usr_email">E-mail*</label>
              <input 
                type="email" 
                id="usr_email" 
                name="email" 
                value={usrEmail} 
                onChange={(e) => setUsrEmail(e.target.value)} 
                placeholder="usuario@empresa.com" 
                required 
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="usr_perfil">Perfil de Acesso*</label>
                <select 
                  id="usr_perfil" 
                  name="perfil" 
                  value={usrPerfil} 
                  onChange={(e) => setUsrPerfil(e.target.value)} 
                  required
                >
                  <option value="gestor">Gestor / Admin</option>
                  <option value="borracheiro">Inspetor / Borracheiro</option>
                  <option value="motorista">Motorista</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="usr_status">Status Inicial*</label>
                <select 
                  id="usr_status" 
                  name="status" 
                  value={usrStatus} 
                  onChange={(e) => setUsrStatus(e.target.value)} 
                  required
                >
                  <option value="active">Ativo</option>
                  <option value="pending">Pendente</option>
                  <option value="blocked">Bloqueado</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="usr_senha">Senha Provisória*</label>
              <input 
                type="password" 
                id="usr_senha" 
                name="senha" 
                value={usrSenha} 
                onChange={(e) => setUsrSenha(e.target.value)} 
                placeholder="••••••••" 
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button type="button" className="btn btn-action" onClick={fecharModal}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Salvar Usuário</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}