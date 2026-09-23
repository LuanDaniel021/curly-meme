import styles from '../../../css/VeiculosView.module.css'

export function Header() {
  return (
    <header className={styles['header']}>
      <div>
        <h1 className={styles['title']}>Gestão de Veículos</h1>
      </div>

      <button className={styles['btn-create']}>
        <span>➕</span> Registrar Veículo
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
      <Card titulo="Total de Veículos" valor={total} />
      <Card titulo="Ativos" valor={ativos} />
      <Card titulo="Inativos" valor={inativos} />
    </div>
  )
}

export function THead() {
  return (
    <thead>
      <tr>
        <th>Veículo</th>
        <th>Placa</th>
        <th>Categoria / Tipo</th>
        <th>Data de Cadastro</th>
        <th className={styles['text-right']}>Ações</th>
      </tr>
    </thead>
  )
}

export function TBody({ veiculos = [] }) {
  if (veiculos.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className={styles['empty-row']}>
            Nenhum veículo encontrado.
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {veiculos.map((veiculo) => (
        <tr key={veiculo.id}>
          <td>
            <div className={styles['veiculo-cell']}>
              <div className={styles['veiculo-info']}>
                <span className={styles['veiculo-modelo']}>{veiculo.modelo}</span>
                <span className={styles['veiculo-marca']}>{veiculo.marca} ({veiculo.ano})</span>
              </div>
            </div>
          </td>
          <td>
            <span className={styles['placa']}>{veiculo.placa}</span>
          </td>
          <td>
            <span className={styles['tipo']}>{veiculo.tipo}</span>
          </td>
          <td className={styles['date-text']}>{veiculo.dataCriacao}</td>
          <td>
            <div className={styles['actions-cell']}>
              <button className={styles['btn-edit']} title="Editar Veículo">
                ✏️ Editar
              </button>
              <button className={styles['btn-delete']} title="Excluir Veículo">
                🗑️ Excluir
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export function TableWrapper({ veiculos = [] }) {
  const totalVeiculos = veiculos.length;

  return (
    <div className={styles['table-wrapper']}>
      <table className={styles['table']}>
        <THead />
        <TBody veiculos={veiculos} />
      </table>

      <footer className={styles['table-footer']}>
        <span className={styles['footer-info']}>
          Exibindo <strong>{totalVeiculos}</strong> de <strong>{totalVeiculos}</strong> veículos
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

export function Content({ veiculos = [] }) {
  return (
    <div className={styles['content']}>
      <Cards total={veiculos.length} ativos={veiculos.length} inativos={0} />
      <TableWrapper veiculos={veiculos} />
    </div>
  )
}
