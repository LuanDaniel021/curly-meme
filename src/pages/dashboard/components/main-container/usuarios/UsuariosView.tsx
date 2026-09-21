import { useState } from 'react';
import styles from './UsuariosView.module.css';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  status: string;
  dataCriacao: string;
  iniciais: string;
}

interface ExcluirUsuario {
  user: 
}

// Dados mockados para exibição na tabela
const INITIAL_USERS: Usuario[] = [
  { id: 1, nome: 'Carlos Eduardo', email: 'carlos.eduardo@empresa.com', cargo: 'Supervisão de Logística', status: 'Ativo', dataCriacao: '12/01/2025', iniciais: 'CE' },
  { id: 2, nome: 'Ana Beatriz', email: 'ana.beatriz@empresa.com', cargo: 'Administrador', status: 'Ativo', dataCriacao: '05/02/2025', iniciais: 'AB' },
  { id: 3, nome: 'Marcos Vinicius', email: 'marcos.v@empresa.com', cargo: 'Operador de Frota', status: 'Inativo', dataCriacao: '20/02/2025', iniciais: 'MV' },
  { id: 4, nome: 'Juliana Costa', email: 'juliana.c@empresa.com', cargo: 'Analista de Suporte', status: 'Ativo', dataCriacao: '10/03/2025', iniciais: 'JC' },
];

function UsuariosView() {
  const [usuarios, setUsuarios] = useState(INITIAL_USERS);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState( null);

  const usuariosFiltrados = usuarios.filter((user) => {
    const atendeBusca = user.nome.toLowerCase().includes(busca.toLowerCase()) || 
                        user.email.toLowerCase().includes(busca.toLowerCase()) ||
                        user.cargo.toLowerCase().includes(busca.toLowerCase());
    
    const atendeStatus = filtroStatus === 'Todos' || user.status === filtroStatus;

    return atendeBusca && atendeStatus;
  });

  // Ações fictícias
  const handleCriarUsuario = () => {
    alert('Abrir formulário de criação de usuário');
  };

  const handleEditarUsuario = (user: Usuario) => {
    alert(`Editar usuário: ${user.nome}`);
  };

  const handleConfirmarExclusao = () => {
    if (usuarioParaExcluir) {
      setUsuarios(usuarios.filter((u: Usuario) => u.id !== (usuarioParaExcluir as Usuario).id));
      setUsuarioParaExcluir(null);
    }
  };

  return (
    <div className={styles['container']}>
      
      {/* CABEÇALHO DO PAINEL */}
      <header className={styles['header']}>
        <div>
          <h1 className={styles['title']}>Gestão de Usuários</h1>
          <p className={styles['subtitle']}>Gerencie permissões, perfis e acessos do sistema.</p>
        </div>
        <button className={styles['btn-create']} onClick={handleCriarUsuario}>
          <span>➕</span> Criar Usuário
        </button>
      </header>

      {/* BARRA DE FILTROS E PESQUISA */}
      <div className={styles['filter-bar']}>
        <div className={styles['search-box']}>
          <span className={styles['search-icon']}>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por nome, e-mail ou cargo..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className={styles['filter-group']}>
          <select 
            value={filtroStatus} 
            onChange={(e) => setFiltroStatus(e.target.value)}
            className={styles['select-filter']}
          >
            <option value="Todos">Todos os Status</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
      </div>

      {/* TABELA DE USUÁRIOS */}
      <div className={styles['table-wrapper']}>
        <table className={styles['table']}>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Cargo</th>
              <th>Status</th>
              <th>Data de Cadastro</th>
              <th className={styles['text-right']}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((user: Usuario) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles['user-cell']}>
                      <div className={styles['avatar']}>{user.iniciais}</div>
                      <div className={styles['user-info']}>
                        <span className={styles['user-name']}>{user.nome}</span>
                        <span className={styles['user-email']}>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles['role-text']}>{user.cargo}</span>
                  </td>
                  <td>
                    <span className={`${styles['status-badge']} ${user.status === 'Ativo' ? styles['status-active'] : styles['status-inactive']}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className={styles['date-text']}>{user.dataCriacao}</td>
                  <td>
                    <div className={styles['actions-cell']}>
                      <button 
                        className={styles['btn-edit']} 
                        onClick={() => handleEditarUsuario(user)}
                        title="Editar Usuário"
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        className={styles['btn-delete']} 
                        onClick={() => setUsuarioParaExcluir(user)}
                        title="Excluir Usuário"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles['empty-row']}>
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* RODAPÉ DA TABELA / PAGINAÇÃO */}
        <footer className={styles['table-footer']}>
          <span className={styles['footer-info']}>
            Exibindo <strong>{usuariosFiltrados.length}</strong> de <strong>{usuarios.length}</strong> usuários
          </span>
          <div className={styles['pagination']}>
            <button className={styles['page-btn']} disabled>Anterior</button>
            <button className={`${styles['page-btn']} ${styles['page-active']}`}>1</button>
            <button className={styles['page-btn']}>Próximo</button>
          </div>
        </footer>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {usuarioParaExcluir && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal']}>
            <h3 className={styles['modal-title']}>Excluir Usuário</h3>
            <p className={styles['modal-text']}>
              Tem certeza que deseja excluir o usuário <strong>{usuarioParaExcluir.nome}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className={styles['modal-actions']}>
              <button 
                className={styles['btn-cancel']} 
                onClick={() => setUsuarioParaExcluir(null)}
              >
                Cancelar
              </button>
              <button 
                className={styles['btn-confirm-delete']} 
                onClick={handleConfirmarExclusao}
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default UsuariosView;