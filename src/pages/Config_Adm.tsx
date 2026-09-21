import { useState } from 'react';

export default function AprovacaoRegras() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalUsuario, setModalUsuario] = useState('-');
  const [modalRegra, setModalRegra] = useState('-');
  const [modalJustificativa, setModalJustificativa] = useState('-');
  const [observacao, setObservacao] = useState('');

  const aprovar = (id: string) => {
    alert(`Solicitação ${id} APROVADA com sucesso! A nova regra de autenticação foi aplicada.`);
  };

  const rejeitar = (id: string) => {
    const motivo = window.prompt("Informe o motivo da rejeição:");
    if (motivo) {
      alert(`Solicitação ${id} REJEITADA. Motivo registrado.`);
    }
  };

  const abrirModal = (usuario: string, regra: string, justificativa: string) => {
    setModalUsuario(usuario);
    setModalRegra(regra);
    setModalJustificativa(justificativa);
    setObservacao('');
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <div className="container">
      
      <div className="header-title">
        <div>
          <h1>Aprovação de Regras de Autenticação</h1>
          <div className="subtitle">Análise de solicitações de novas políticas de acesso e segurança enviados pelos usuários</div>
        </div>
      </div>

      {/* CARDS DE METRICAS */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="label">Pendentes</div>
          <div className="value" style={{ color: 'var(--warning)' }}>3</div>
        </div>
        <div className="summary-card">
          <div className="label">Aprovadas (Este Mês)</div>
          <div className="value" style={{ color: 'var(--success)' }}>12</div>
        </div>
        <div className="summary-card">
          <div className="label">Rejeitadas (Este Mês)</div>
          <div className="value" style={{ color: 'var(--danger)' }}>2</div>
        </div>
        <div className="summary-card">
          <div className="label">Total de Regras Ativas</div>
          <div className="value">18</div>
        </div>
      </div>

      {/* TABELA DE SOLICITAÇÕES */}
      <div className="card">
        <div className="table-filters">
          <input type="text" className="filter-input" placeholder="Buscar por usuário, regra ou motivo..." style={{ width: '300px' }} />
          <select className="filter-input" defaultValue="pending">
            <option value="all">Todos os Status</option>
            <option value="pending">Apenas Pendentes</option>
            <option value="approved">Aprovados</option>
            <option value="rejected">Rejeitados</option>
          </select>
        </div>

        <table className="requests-table">
          <thead>
            <tr>
              <th>Solicitante</th>
              <th>Tipo de Regra Solicitada</th>
              <th>Motivo / Justificativa</th>
              <th>Data</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Ações do ADM</th>
            </tr>
          </thead>
          <tbody>
            {/* LINHA 1 - PENDENTE */}
            <tr>
              <td>
                <div className="user-info">
                  <span className="user-name">Carlos Eduardo</span>
                  <span className="user-role">Supervisão de Logística</span>
                </div>
              </td>
              <td><span className="tag-rule">MFA / 2FA Obrigatório</span></td>
              <td>Aumento de segurança para acesso de operadores terceirizados.</td>
              <td>16/09/2026</td>
              <td><span className="badge badge-pending">Pendente</span></td>
              <td style={{ textAlign: 'right' }}>
                <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                  <button className="btn btn-approve" onClick={() => aprovar('SOL-001')}>Aprovar</button>
                  <button className="btn btn-reject" onClick={() => rejeitar('SOL-001')}>Rejeitar</button>
                  <button className="btn btn-details" onClick={() => abrirModal('Carlos Eduardo', 'MFA / 2FA Obrigatório', 'Aumento de segurança para acesso de operadores terceirizados em dispositivos móveis no pátio.')}>Ver</button>
                </div>
              </td>
            </tr>

            {/* LINHA 2 - PENDENTE */}
            <tr>
              <td>
                <div className="user-info">
                  <span className="user-name">Mariana Torres</span>
                  <span className="user-role">Analista de TI</span>
                </div>
              </td>
              <td><span className="tag-rule">Restrição por Faixa IP</span></td>
              <td>Limitar acesso do módulo de relatórios ao IP da VPN corporativa.</td>
              <td>15/09/2026</td>
              <td><span className="badge badge-pending">Pendente</span></td>
              <td style={{ textAlign: 'right' }}>
                <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                  <button className="btn btn-approve" onClick={() => aprovar('SOL-002')}>Aprovar</button>
                  <button className="btn btn-reject" onClick={() => rejeitar('SOL-002')}>Rejeitar</button>
                  <button className="btn btn-details" onClick={() => abrirModal('Mariana Torres', 'Restrição por Faixa IP', 'Bloquear login direto da internet no portal financeiro, exigindo IP fixo 192.168.10.0/24.')}>Ver</button>
                </div>
              </td>
            </tr>

            {/* LINHA 3 - APROVADO */}
            <tr>
              <td>
                <div className="user-info">
                  <span className="user-name">Roberto Lima</span>
                  <span className="user-role">Gerente de Frotas</span>
                </div>
              </td>
              <td><span className="tag-rule">SAML 2.0 / SSO</span></td>
              <td>Integração do login com a conta do Azure AD / Microsoft 365.</td>
              <td>10/09/2026</td>
              <td><span className="badge badge-approved">Aprovado</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-details" onClick={() => abrirModal('Roberto Lima', 'SAML 2.0 / SSO', 'Integração completa com Microsoft Azure AD para Single Sign-On dos motoristas.')}>Ver Detalhes</button>
              </td>
            </tr>

            {/* LINHA 4 - REJEITADO */}
            <tr>
              <td>
                <div className="user-info">
                  <span className="user-name">Fernando Souza</span>
                  <span className="user-role">Borracheiro Chefe</span>
                </div>
              </td>
              <td><span className="tag-rule">Desativar Exp. Senha</span></td>
              <td>Solicitou para não expirar a senha a cada 90 dias no tablet do pátio.</td>
              <td>08/09/2026</td>
              <td><span className="badge badge-rejected">Rejeitado</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn btn-details" onClick={() => abrirModal('Fernando Souza', 'Desativar Exp. Senha', 'Solicitação violava as políticas gerais de segurança da informação da empresa.')}>Ver Detalhes</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL DE ANÁLISE E DETALHES */}
      <div className={`modal-overlay ${modalAberto ? 'active' : ''}`} id="modalSolicitacao">
        <div className="modal">
          <div className="modal-header">
            <h3>Detalhes da Solicitação</h3>
            <button className="close-modal" onClick={fecharModal}>✕</button>
          </div>

          <div className="detail-group">
            <div className="detail-label">Solicitante</div>
            <div className="detail-value" id="modalUsuario">{modalUsuario}</div>
          </div>

          <div className="detail-group">
            <div className="detail-label">Regra Solicitada</div>
            <div className="detail-value" id="modalRegra">{modalRegra}</div>
          </div>

          <div className="detail-group">
            <div className="detail-label">Justificativa Completa</div>
            <div className="detail-value" id="modalJustificativa" style={{ minHeight: '60px' }}>{modalJustificativa}</div>
          </div>

          <div className="detail-group">
            <div className="detail-label">Parecer / Observação do Administrador</div>
            <textarea 
              className="modal-reason" 
              rows={3} 
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Digite uma observação (obrigatório em caso de rejeição)..."
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className="btn btn-reject" style={{ padding: '10px 16px' }} onClick={fecharModal}>Rejeitar Solicitação</button>
            <button className="btn btn-approve" style={{ padding: '10px 16px' }} onClick={fecharModal}>Aprovar e Aplicar Regra</button>
          </div>
        </div>
      </div>

    </div>
  );
}