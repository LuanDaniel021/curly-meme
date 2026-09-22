
import styles from '../../../../css/UsuariosView.module.css'

export function Header() {
  return (
    <header className={styles['header']}>
      <div>
        <h1 className={styles['title']}>Gestão de Usuários</h1>
        <p className={styles['subtitle']}>Gerencie permissões, perfis e acessos do sistema.</p>
      </div>

      <button className={styles['btn-create']}>
        <span>➕</span> Criar Usuário
      </button>
    </header>
  )
}

export function Card({ titulo, valor, icon }) {
  return (
    <div className={styles['card']}>
      <span className={styles['card-title']}>{titulo}</span>
      <span className={styles['card-value']}>{valor}</span>
      {icon && <span className={styles['card-icon']}>{icon}</span>}
    </div>
  )
}

export function Cards({ total = 0, ativos = 0, inativos = 0 }) {
  return (
    <div className={styles['cards-grid']}>
      <Card titulo="Total de Usuários" valor={total} />
      <Card titulo="Ativos" valor={ativos} />
      <Card titulo="Inativos" valor={inativos} />
    </div>
  )
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

export function TableWrapper({ users = [] }) {
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

export function Content({ users = [] }) {
  return (
    <div className={styles['content']}>
      <Cards total={users.length} ativos={users.length} inativos={0} />
      <TableWrapper users={users} />
    </div>
  )
}