
import { useEffect, useState } from 'react'
import styles from '../../css/UsuariosView.module.css'
import { Header, Content } from './usuarios/components/user.jsx'
import { api } from '../../../../../../service/api';

// 1. Dados mockados para exemplo

// interface Usuario {
//   id: string;
//   nome: string;
//   email: string;
//   role: string;
//   dataCriacao: string;
// }

interface MockUser {
  id: string
  nome: string
  email: string
  iniciais: string
  role: string
  dataCriacao: string
}


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
