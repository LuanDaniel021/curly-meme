
import { useEffect, useState, type FormEvent } from 'react'
import styles from '../../css/Usuarios.module.css'
import Header from './UsuariosView/Header'
import Content from './UsuariosView/Content'
import { ModalCriar, ModalEditar, ModalExcluir, type NovoUsuarioForm } from './UsuariosView/Modals';

import { api } from '../../../../../../service/api.js';

import type { MockUser } from './UsuariosView/TableWrapper.js';

// interface Usuario {
//   id: string;
//   nome: string;
//   email: string;
//   role: string;
//   dataCriacao: string;
// }

function UsuariosView() {

  const [users, setUsers] = useState<MockUser[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<MockUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<MockUser | null>(null);
  const [newUser, setNewUser] = useState<NovoUsuarioForm>({ nome: '', email: '', role: 'User' });
  const [newRole, setNewRole] = useState('User');

  const loadUsers = async () => {
    try {
      const response = await api.get('users/admin');
      const data = response && typeof response === 'object' && 'data' in response ? response.data : response;
      const list = Array.isArray(data) ? data : [];
      setUsers(list.map((user) => {
        const item = user as Partial<MockUser>;
        return {
          id: String(item.id),
          nome: item.nome || '',
          email: item.email || '',
          iniciais: item.iniciais || (item.nome || 'US').slice(0, 2).toUpperCase(),
          role: item.role || 'User',
          dataCriacao: item.dataCriacao || '-',
        };
      }));
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert(error instanceof Error ? error.message : 'Não foi possível carregar os usuários.');
    }
  };

  useEffect(() => {
    loadUsers();
  }, [])

  const createUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api.post('users/admin', newUser);
      setCreateOpen(false);
      setNewUser({ nome: '', email: '', role: 'User' });
      await loadUsers();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Não foi possível criar o usuário.');
    }
  };

  const updateUser = async () => {
    if (!userToEdit) return;
    try {
      await api.patch(`users/admin/${userToEdit.id}`, { role: newRole });
      setUserToEdit(null);
      await loadUsers();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Não foi possível editar o usuário.');
    }
  };

  const deleteUser = async () => {
    if (!userToDelete) return;
    try {
      await api.delete(`users/admin/${userToDelete.id}`);
      setUserToDelete(null);
      await loadUsers();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Não foi possível excluir o usuário.');
    }
  };

  return (
    <div className={styles['container']}>
      <Header onCreate={() => setCreateOpen(true)} />
      <Content users={users} onEdit={(user) => { setUserToEdit(user); setNewRole(user.role); }} onDelete={setUserToDelete} />
      {createOpen && <ModalCriar novoUsuario={newUser} setNovoUsuario={setNewUser} onClose={() => setCreateOpen(false)} onSubmit={createUser} />}
      {userToEdit && <ModalEditar usuario={userToEdit} novoRole={newRole} setNovoRole={setNewRole} onClose={() => setUserToEdit(null)} onSave={updateUser} />}
      {userToDelete && <ModalExcluir usuario={userToDelete} onClose={() => setUserToDelete(null)} onConfirm={deleteUser} />}
    </div>
  )
}

export default UsuariosView;
