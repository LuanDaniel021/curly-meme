import styles from '../../../../css/MedicoesView.module.css'

export function Header() {
  return (
    <header className={styles['header']}>
      <div>
        <h1 className={styles['title']}>Gestão de Medições</h1>
      </div>

      <button className={styles['btn-create']}>
        <span>➕</span> Registrar Medição
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

export function Cards({ total = 0, conclusas = 0, pendentes = 0 }) {
  return (
    <div className={styles['cards-grid']}>
      <Card titulo="Total de Medições" valor={total} />
      <Card titulo="Concluídas" valor={conclusas} />
      <Card titulo="Pendentes" valor={pendentes} />
    </div>
  )
}

export function THead() {
  return (
    <thead>
      <tr>
        <th>Ponto / Equipamento</th>
        <th>Valor Medido</th>
        <th>Data da Medição</th>
        <th>Status</th>
        <th className={styles['text-right']}>Ações</th>
      </tr>
    </thead>
  )
}

export function TBody({ medicoes = [] }) {
  if (medicoes.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className={styles['empty-row']}>
            Nenhuma medição encontrada.
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {medicoes.map((medicao) => (
        <tr key={medicao.id}>
          <td>
            <div className={styles['medicao-cell']}>
              <div className={styles['medicao-info']}>
                <span className={styles['medicao-ponto']}>{medicao.ponto}</span>
                <span className={styles['medicao-equipamento']}>{medicao.equipamento}</span>
              </div>
            </div>
          </td>
          <td>
            <span className={styles['medicao-valor']}>
              {medicao.valor} {medicao.unidade}
            </span>
          </td>
          <td className={styles['date-text']}>{medicao.dataMedicao}</td>
          <td>
            <span className={styles['status']}>{medicao.status}</span>
          </td>
          <td>
            <div className={styles['actions-cell']}>
              <button className={styles['btn-edit']} title="Editar Medição">
                ✏️ Editar
              </button>
              <button className={styles['btn-delete']} title="Excluir Medição">
                🗑️ Excluir
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export function TableWrapper({ medicoes = [] }) {
  const totalMedicoes = medicoes.length;

  return (
    <div className={styles['table-wrapper']}>
      <table className={styles['table']}>
        <THead />
        <TBody medicoes={medicoes} />
      </table>

      <footer className={styles['table-footer']}>
        <span className={styles['footer-info']}>
          Exibindo <strong>{totalMedicoes}</strong> de <strong>{totalMedicoes}</strong> medições
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

export function Content({ medicoes = [] }) {
  return (
    <div className={styles['content']}>
      <Cards total={medicoes.length} conclusas={medicoes.length} pendentes={0} />
      <TableWrapper medicoes={medicoes} />
    </div>
  )
}
