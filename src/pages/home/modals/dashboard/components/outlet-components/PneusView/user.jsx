import styles from '../../../css/Pneus.module.css'

export function Header() {
  return (
    <header className={styles['header']}>
      <div>
        <h1 className={styles['title']}>Gestão de Pneus</h1>
      </div>

      <button className={styles['btn-create']}>
        <span>➕</span> Registrar Pneu
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

export function Cards({ total = 0, emUso = 0, estoque = 0 }) {
  return (
    <div className={styles['cards-grid']}>
      <Card titulo="Total de Pneus" valor={total} />
      <Card titulo="Em Uso" valor={emUso} />
      <Card titulo="Em Estoque" valor={estoque} />
    </div>
  )
}

export function THead() {
  return (
    <thead>
      <tr>
        <th>Pneu / Fogo</th>
        <th>Marca / Modelo</th>
        <th>Medida</th>
        <th>Veículo / Posição</th>
        <th>Sulco (mm)</th>
        <th className={styles['text-right']}>Ações</th>
      </tr>
    </thead>
  )
}

export function TBody({ pneus = [] }) {
  if (pneus.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} className={styles['empty-row']}>
            Nenhum pneu encontrado.
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {pneus.map((pneu) => (
        <tr key={pneu.id}>
          <td>
            <div className={styles['pneu-cell']}>
              <div className={styles['pneu-info']}>
                <span className={styles['pneu-codigo']}>{pneu.codigoFogo || pneu.id}</span>
                <span className={styles['pneu-dot']}>DOT: {pneu.dot}</span>
              </div>
            </div>
          </td>
          <td>
            <span className={styles['marca-modelo']}>{pneu.marca} {pneu.modelo}</span>
          </td>
          <td>
            <span className={styles['medida']}>{pneu.medida}</span>
          </td>
          <td>
            <div className={styles['posicao-info']}>
              <span className={styles['veiculo']}>{pneu.veiculo || 'Estoque'}</span>
              {pneu.posicao && <span className={styles['posicao']}>({pneu.posicao})</span>}
            </div>
          </td>
          <td>
            <span className={styles['sulco']}>{pneu.sulcoAtual} mm</span>
          </td>
          <td>
            <div className={styles['actions-cell']}>
              <button className={styles['btn-edit']} title="Editar Pneu">
                ✏️ Editar
              </button>
              <button className={styles['btn-delete']} title="Excluir Pneu">
                🗑️ Excluir
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export function TableWrapper({ pneus = [] }) {
  const totalPneus = pneus.length;

  return (
    <div className={styles['table-wrapper']}>
      <table className={styles['table']}>
        <THead />
        <TBody pneus={pneus} />
      </table>

      <footer className={styles['table-footer']}>
        <span className={styles['footer-info']}>
          Exibindo <strong>{totalPneus}</strong> de <strong>{totalPneus}</strong> pneus
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

export function Content({ pneus = [] }) {
  return (
    <div className={styles['content']}>
      <Cards total={pneus.length} emUso={pneus.length} estoque={0} />
      <TableWrapper pneus={pneus} />
    </div>
  )
}
