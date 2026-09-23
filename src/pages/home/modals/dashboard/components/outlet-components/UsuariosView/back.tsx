
import styles from '../../css/UsuariosView.module.css';

import { useEffect, useState, type FormEvent } from 'react';

import { api } from '../../../../../../../service/api';

// ==========================================
// TIPAGENS
// ==========================================
interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
  status: string;
  dataCriacao: string;
  iniciais: string;
}

interface NovoUsuarioForm {
  nome: string;
  email: string;
  role: string;
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
function UsuariosView() {
  // --- Estados Principais ---
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // --- Estados de Controle de Modais ---
  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState<Usuario | null>(null);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState<Usuario | null>(null);

  // --- Estados de Formulário ---
  const [novoUsuario, setNovoUsuario] = useState<NovoUsuarioForm>({
    nome: '',
    email: '',
    role: 'User',
  });
  const [novoRole, setNovoRole] = useState('User');

  // --- Efeito Inicial: Busca de Dados ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('users/admin');
        setUsuarios(res.data);
      } catch (e) {
        console.error('Erro ao buscar usuários:', e);
      }
    };
    fetchData();
  }, []);

  // --- Regra de Filtragem (Estado Derivado) ---
  const usuariosFiltrados = usuarios.filter((user) => {
    const termo = busca.toLowerCase();
    const atendeBusca =
      user.nome.toLowerCase().includes(termo) ||
      user.email.toLowerCase().includes(termo) ||
      user.role.toLowerCase().includes(termo);

    const atendeStatus = filtroStatus === 'Todos' || user.status === filtroStatus;

    return atendeBusca && atendeStatus;
  });

  // --- Handlers: Criar Usuário ---
  const handleAbrirCriar = () => {
    setNovoUsuario({ nome: '', email: '', role: 'User' });
    setModalCriarAberto(true);
  };

  const handleSalvarNovoUsuario = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('users/admin', novoUsuario);
      
      // Monta objeto garantindo propriedades de exibição
      const usuarioCriado: Usuario = {
        id: response.data.id || Date.now(),
        nome: response.data.nome || novoUsuario.nome,
        email: response.data.email || novoUsuario.email,
        role: response.data.role || novoUsuario.role,
        status: response.data.status || 'Ativo',
        dataCriacao: response.data.dataCriacao || new Date().toLocaleDateString('pt-BR'),
        iniciais: response.data.iniciais || novoUsuario.nome.slice(0, 2).toUpperCase(),
      };

      setUsuarios((prev) => [...prev, usuarioCriado]);
      setModalCriarAberto(false);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  // --- Handlers: Editar Usuário ---
  const handleAbrirEditar = (user: Usuario) => {
    setUsuarioParaEditar(user);
    setNovoRole(user.role || 'User');
  };

  const handleSalvarEdicao = async () => {
    if (!usuarioParaEditar) return;
    try {
      await api.patch(`users/admin/${usuarioParaEditar.id}`, { role: novoRole });

      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioParaEditar.id ? { ...u, role: novoRole } : u))
      );
    } catch (e) {
      console.error('Erro ao editar usuário:', e);
    } finally {
      setUsuarioParaEditar(null);
    }
  };

  // --- Handlers: Excluir Usuário ---
  const handleConfirmarExclusao = async () => {
    if (!usuarioParaExcluir) return;
    try {
      await api.delete(`users/admin/${usuarioParaExcluir.id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== usuarioParaExcluir.id));
    } catch (e) {
      console.error('Erro ao excluir usuário:', e);
    } finally {
      setUsuarioParaExcluir(null);
    }
  };

  // --- Renderização ---
  return (
    <div className={styles['container']}>
      
      {/* CABEÇALHO */}
      <header className={styles['header']}>
        <div>
          <h1 className={styles['title']}>Gestão de Usuários</h1>
          <p className={styles['subtitle']}>Gerencie permissões, perfis e acessos do sistema.</p>
        </div>
        <button className={styles['btn-create']} onClick={handleAbrirCriar}>
          <span>➕</span> Criar Usuário
        </button>
      </header>

      {/* FILTROS DE PESQUISA */}
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

      {/* TABELA */}
      <div className={styles['table-wrapper']}>
        <table className={styles['table']}>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Regra</th>
              <th>Status</th>
              <th>Data de Cadastro</th>
              <th className={styles['text-right']}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((user) => (
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
                    <span className={styles['role']}>{user.role}</span>
                  </td>
                  <td>
                    <span
                      className={`${styles['status-badge']} ${
                        user.status === 'Ativo' ? styles['status-active'] : styles['status-inactive']
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className={styles['date-text']}>{user.dataCriacao}</td>
                  <td>
                    <div className={styles['actions-cell']}>
                      <button
                        className={styles['btn-edit']}
                        onClick={() => handleAbrirEditar(user)}
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
                <td colSpan={5} className={styles['empty-row']}>
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINAÇÃO */}
        <footer className={styles['table-footer']}>
          <span className={styles['footer-info']}>
            Exibindo <strong>{usuariosFiltrados.length}</strong> de <strong>{usuarios.length}</strong> usuários
          </span>
          <div className={styles['pagination']}>
            <button className={styles['page-btn']} disabled>
              Anterior
            </button>
            <button className={`${styles['page-btn']} ${styles['page-active']}`}>1</button>
            <button className={styles['page-btn']}>Próximo</button>
          </div>
        </footer>
      </div>

      {/* MODAIS */}
      {modalCriarAberto && (
        <ModalCriar
          novoUsuario={novoUsuario}
          setNovoUsuario={setNovoUsuario}
          onClose={() => setModalCriarAberto(false)}
          onSubmit={handleSalvarNovoUsuario}
        />
      )}

      {usuarioParaEditar && (
        <ModalEditar
          usuario={usuarioParaEditar}
          novoRole={novoRole}
          setNovoRole={setNovoRole}
          onClose={() => setUsuarioParaEditar(null)}
          onSave={handleSalvarEdicao}
        />
      )}

      {usuarioParaExcluir && (
        <ModalExcluir
          usuario={usuarioParaExcluir}
          onClose={() => setUsuarioParaExcluir(null)}
          onConfirm={handleConfirmarExclusao}
        />
      )}
    </div>
  );
}

// ==========================================
// COMPONENTES AUXILIARES DE MODAL
// ==========================================

export default UsuariosView;