import { useState } from 'react';

function PerfilUsuario() {
  // Estado para controlar qual aba do perfil está ativa
  const [activeTab, setActiveTab] = useState('atividades');
  // Estado para controlar a aba selecionada na barra de navegação inferior
  const [activeNav, setActiveNav] = useState('perfil');

  return (
    <div className="app-container">
      
      {/* BARRA SUPERIOR */}
      <div className="top-nav">
        <div className="brand">
          <div className="brand-icon">F</div>
          <span>FleetSys</span>
        </div>
        <div className="top-nav-actions">
          <button className="icon-btn">🔍</button>
          <div className="mini-avatar">CE</div>
        </div>
      </div>

      {/* CAPA E FOTO */}
      <div className="cover-container"></div>

      <div className="profile-header">
        <div className="avatar-wrapper">
          <div className="profile-avatar">CE</div>
          <div className="profile-actions">
            <button className="btn-icon-action" title="Editar Perfil">✏️</button>
            <button className="btn-icon-action" title="Opções">•</button>
          </div>
        </div>

        <div className="user-names">
          <div className="fullname">CARLOS EDUARDO</div>
          <div className="handle">@carlos.eduardo</div>
          <span className="user-role-badge">Supervisão de Logística</span>
        </div>

        {/* ABAS DE NAVEGAÇÃO */}
        <div className="profile-tabs">
          <div 
            className={`tab-item ${activeTab === 'atividades' ? 'active' : ''}`} 
            onClick={() => setActiveTab('atividades')}
          >
            Atividades
          </div>
          <div 
            className={`tab-item ${activeTab === 'veiculos' ? 'active' : ''}`} 
            onClick={() => setActiveTab('veiculos')}
          >
            Veículos
          </div>
          <div 
            className={`tab-item ${activeTab === 'info' ? 'active' : ''}`} 
            onClick={() => setActiveTab('info')}
          >
            Info
          </div>
          <div 
            className={`tab-item ${activeTab === 'historico' ? 'active' : ''}`} 
            onClick={() => setActiveTab('historico')}
          >
            Histórico
          </div>
        </div>
      </div>

      {/* CONTEÚDO DA ABA SELECIONADA */}
      <div className={`tab-content ${activeTab === 'atividades' ? 'active' : ''}`} style={{ display: activeTab === 'atividades' ? 'block' : 'none' }}>
        <div className="empty-state">
          Nenhuma atividade recente registrada para este usuário.
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'veiculos' ? 'active' : ''}`} style={{ display: activeTab === 'veiculos' ? 'block' : 'none' }}>
        <div className="empty-state">
          Nenhum veículo vinculado diretamente.
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'info' ? 'active' : ''}`} style={{ display: activeTab === 'info' ? 'block' : 'none' }}>
        <div className="empty-state">
          Informações do perfil e departamento.
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'historico' ? 'active' : ''}`} style={{ display: activeTab === 'historico' ? 'block' : 'none' }}>
        <div className="empty-state">
          Histórico de acessos e movimentações.
        </div>
      </div>

      {/* BARRA DE NAVEGAÇÃO INFERIOR */}
      <div className="bottom-nav">
        <a 
          href="#inicio" 
          onClick={(e) => { e.preventDefault(); setActiveNav('inicio'); }} 
          className={`nav-item ${activeNav === 'inicio' ? 'active' : ''}`}
        >
          <span className="icon">🏠</span>
          <span>Início</span>
        </a>
        <a 
          href="#frota" 
          onClick={(e) => { e.preventDefault(); setActiveNav('frota'); }} 
          className={`nav-item ${activeNav === 'frota' ? 'active' : ''}`}
        >
          <span className="icon">🚚</span>
          <span>Frota</span>
        </a>
        <a 
          href="#inspecao" 
          onClick={(e) => { e.preventDefault(); setActiveNav('inspecao'); }} 
          className={`nav-item ${activeNav === 'inspecao' ? 'active' : ''}`}
        >
          <span className="icon">🔍</span>
          <span>Inspeção</span>
        </a>
        <a 
          href="#dashboard" 
          onClick={(e) => { e.preventDefault(); setActiveNav('dashboard'); }} 
          className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
        >
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a 
          href="#perfil" 
          onClick={(e) => { e.preventDefault(); setActiveNav('perfil'); }} 
          className={`nav-item ${activeNav === 'perfil' ? 'active' : ''}`}
        >
          <span className="icon">👤</span>
          <span>Perfil</span>
        </a>
      </div>

    </div>
  );
}

export default PerfilUsuario;