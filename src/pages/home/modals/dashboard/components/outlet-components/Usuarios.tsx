
import { useEffect, useState } from 'react'
import styles from '../../css/Usuarios.module.css'
import Header from './UsuariosView/Header'
import Content from './UsuariosView/Content'

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

  useEffect( () => {
    const handler = async () => {
      try {
        const res = await api.get('users/admin');
        setUsers(res.data);
      } catch (e) {
        console.error('Erro ao buscar usuários:', e);
      }
    }
    handler()
  },[] )

  ;

  return (
    <div className={styles['container']}>
      <Header />
      <Content users={users} />
    </div>
  )
}

export default UsuariosView;
