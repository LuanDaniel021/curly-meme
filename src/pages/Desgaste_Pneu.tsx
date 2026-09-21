function DashboardCPK() {
  return (
    <div className="container">
      <div className="header-title">
        <h2>Dashboard & Custo por KM (CPK)</h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Setembro / 2026</span>
      </div>

      {/* CARTOES DE METRICAS (KPIS) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">CPK Médio Frota</div>
          <div className="kpi-value">R$ 0,042</div>
          <div className="kpi-subtext text-success">▼ -3.2% vs mês anterior</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Total de Pneus Ativos</div>
          <div className="kpi-value">128</div>
          <div className="kpi-subtext text-title">86% em operação</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Alertas Críticos</div>
          <div className="kpi-value text-danger">6</div>
          <div className="kpi-subtext text-danger">Requer ação imediata</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-title">Investimento Mês</div>
          <div className="kpi-value">R$ 8.450</div>
          <div className="kpi-subtext text-title">12 Recapagens realizadas</div>
        </div>
      </div>

      {/* CONTEUDO PRINCIPAL */}
      <div className="dashboard-grid">
        
        {/* ALERTAS DA FROTA */}
        <div className="card">
          <div className="section-title">Pneus em Estado Crítico</div>
          
          <table className="alert-table">
            <thead>
              <tr>
                <th>Pneu</th>
                <th>Placa / Pos</th>
                <th>Problema</th>
                <th>Medição</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PN-0042</td>
                <td>ABC1D23 / E0E</td>
                <td><span className="badge badge-danger">Careca</span></td>
                <td>1.8 mm</td>
                <td>Trocar</td>
              </tr>
              <tr>
                <td>PN-0089</td>
                <td>XYZ9876 / E1EE</td>
                <td><span className="badge badge-warning">Pressão Baixa</span></td>
                <td>82 PSI</td>
                <td>Calibrar</td>
              </tr>
              <tr>
                <td>PN-0102</td>
                <td>ABC1D23 / E1ID</td>
                <td><span className="badge badge-danger">Corte Banda</span></td>
                <td>Avaria F.</td>
                <td>Manutenção</td>
              </tr>
              <tr>
                <td>PN-0055</td>
                <td>KMS4500 / E0D</td>
                <td><span className="badge badge-warning">Desgaste Irreg.</span></td>
                <td>3.1 mm</td>
                <td>Alinhar</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RANKING DE MARCAS (DESEMPENHO) */}
        <div className="card">
          <div className="section-title">CPK por Marca (Menor Custo)</div>

          <div className="bar-container">
            <div className="bar-label">
              <span>Michelin</span>
              <span className="text-success">R$ 0,038 / km</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: '90%' }}></div>
            </div>
          </div>

          <div className="bar-container">
            <div className="bar-label">
              <span>Bridgestone</span>
              <span className="text-success">R$ 0,041 / km</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: '82%' }}></div>
            </div>
          </div>

          <div className="bar-container">
            <div className="bar-label">
              <span>Goodyear</span>
              <span>R$ 0,045 / km</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: '70%' }}></div>
            </div>
          </div>

          <div className="bar-container">
            <div className="bar-label">
              <span>Pirelli</span>
              <span className="text-danger">R$ 0,052 / km</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: '55%', backgroundColor: 'var(--danger)' }}></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardCPK;