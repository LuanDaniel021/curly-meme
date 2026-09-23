
import { div } from 'three/tsl'
import styles from '../../../css/Usuarios.module.css'
import { Cards } from './Cards'
import { ModalCriar, ModalEditar, ModalExcluir, type NovoUsuarioForm, type Usuario } from './Modals'

import TableWrapper, { type MockUser } from './TableWrapper'
import { useState, type FormEvent } from 'react'
import { api } from '../../../../../../../service/api'

interface PContent {
  users: MockUser[] 
} 

function Content({ users = [] }: PContent) {

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

    
      // --- Regra de Filtragem (Estado Derivado) -
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

  return (
    <div className={styles['content']}>
      <Cards total={users.length} ativos={users.length} inativos={0} />
      <TableWrapper users={users} />

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
  )
}

export default Content;