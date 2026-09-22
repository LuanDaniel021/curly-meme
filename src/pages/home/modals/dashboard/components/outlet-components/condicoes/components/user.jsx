import styles from '../../../../css/CondicoesView.module.css'

export function Header() {
  return (
    <header className={styles['header']}>
      <div>
        <h1 className={styles['title']}>Gestão de Condições</h1>
      </div>

      <button className={styles['btn-create']}>
        <span>➕</span> Registrar Condição
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

export function Cards({ total = 0, ativas = 0, inativas = 0 }) {
  return (
    <div className={styles['cards-grid']}>
      <Card titulo="Total de Condições" valor={total} />
      <Card titulo="Ativas" valor={ativas} />
      <Card titulo="Inativas" valor={inativas} />
    </div>
  )
}

export function THead() {
  return (
    <thead>
      <tr>
        <th>Condição / Parâmetro</th>
        <th>Valor / Limite</th>
        <th>Tipo</th>
        <th>Status</th>
        <th className={styles['text-right']}>Ações</th>
      </tr>
    </thead>
  )
}

export function TBody({ condicoes = [] }) {
  if (condicoes.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className={styles['empty-row']}>
            Nenhuma condição encontrada.
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {condicoes.map((condicao) => (
        <tr key={condicao.id}>
          <td>
            <div className={styles['condicao-cell']}>
              <div className={styles['condicao-info']}>
                <span className={styles['condicao-nome']}>{condicao.nome}</span>
                <span className={styles['condicao-descricao']}>{condicao.descricao}</span>
              </div>
            </div>
          </td>
          <td>
            <span className={styles['condicao-valor']}>
              {condicao.operador} {condicao.valorLimite}
            </span>
          </td>
          <td>
            <span className={styles['tipo']}>{condicao.tipo}</span>
          </td>
          <td>
            <span className={styles['status']}>{condicao.status}</span>
          </td>
          <td>
            <div className={styles['actions-cell']}>
              <button className={styles['btn-edit']} title="Editar Condição">
                ✏️ Editar
              </button>
              <button className={styles['btn-delete']} title="Excluir Condição">
                🗑️ Excluir
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export function TableWrapper({ condicoes = [] }) {
  const totalCondicoes = condicoes.length;

  return (
    <div className={styles['table-wrapper']}>
      <table className={styles['table']}>
        <THead />
        <TBody condicoes={condicoes} />
      </table>

      <footer className={styles['table-footer']}>
        <span className={styles['footer-info']}>
          Exibindo <strong>{totalCondicoes}</strong> de <strong>{totalCondicoes}</strong> condições
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

export function Content({ condicoes = [] }) {
  return (
    <div className={styles['content']}>
      <Cards total={condicoes.length} ativas={condicoes.length} inativas={0} />
      <TableWrapper condicoes={condicoes} />
    </div>
  )
}
