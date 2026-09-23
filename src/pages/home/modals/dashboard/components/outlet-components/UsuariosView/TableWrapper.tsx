
import styles from '../../../css/Usuarios.module.css'

export interface MockUser {
  id: string
  nome: string
  email: string
  iniciais: string
  role: string
  dataCriacao: string
}

export function THead() {
  return (
    <thead>
      <tr>
        <th>Usuário</th>
        <th>Regra</th>
        <th>Data de Cadastro</th>
        <th className={styles['text-right']}>Ações</th>
      </tr>
    </thead>
  )
}

export function TBody({ users = [] }) {
  if (users.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className={styles['empty-row']}>
            Nenhum usuário encontrado.
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {users.map((user) => (
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
          <td className={styles['date-text']}>{user.dataCriacao}</td>
          <td>
            <div className={styles['actions-cell']}>
              <button className={styles['btn-edit']} title="Editar Usuário">
                ✏️ Editar
              </button>
              <button className={styles['btn-delete']} title="Excluir Usuário">
                🗑️ Excluir
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

function TableWrapper({ users = [] }) {
  const totalUsers = users.length;

  return (
    <div className={styles['table-wrapper']}>
      <table className={styles['table']}>
        <THead />
        <TBody users={users} />
      </table>

      <footer className={styles['table-footer']}>
        <span className={styles['footer-info']}>
          Exibindo <strong>{totalUsers}</strong> de <strong>{totalUsers}</strong> usuários
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
  )
}

export default TableWrapper;
