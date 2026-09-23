
import { useState } from 'react';
import styles from '../css/Dashboard.module.css';

interface SidebarProps {
  isAdmin: boolean;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const OPCOES_VEICULO = [
  { id: 'veiculo-3d-geral', label: 'Visão Geral 3D' },
  { id: 'veiculo-3d-pneus', label: 'Verificar Pneus' },
  { id: 'veiculo-3d-chassi', label: 'Inspeção do Chassi' },
];

const OPCOES_PNEU = [
  { id: 'pneu-estoque', label: 'Estoque' },
  { id: 'pneu-historico', label: 'Histórico de Trocas' },
  { id: 'pneu-analise', label: 'Análise de Vida Útil' },
];

const OPCOES_TEMPLATES = [
  { id: 'templates-inspecao', label: 'Templates de Inspeção' },
  { id: 'templates-manutencao', label: 'Templates de Manutenção' },
  { id: 'templates-criar', label: 'Novo Template' },
];

const OPCOES_MANUTENCAO = [
  { id: 'manutencao-preventiva', label: 'Preventivas' },
  { id: 'manutencao-corretiva', label: 'Corretivas' },
  { id: 'manutencao-agendamentos', label: 'Agendamentos' },
];

function Sidebar({ isAdmin, activeTab, onSelectTab }: SidebarProps) {
  
  const [isVeiculosOpen, setIsVeiculosOpen] = useState(false);
  const [isPneusOpen, setIsPneusOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isManutencaoOpen, setIsManutencaoOpen] = useState(false);

  // O item de veículos fica destacado se ele mesmo ou alguma sub-aba estiver ativa
  const isVeiculoActive = activeTab === 'veiculo' || OPCOES_VEICULO.some((opt) => opt.id === activeTab);
  // const isVeiculoActive = OPCOES_VEICULO.some((opt) => opt.id === activeTab);
  const isPneuActive = OPCOES_PNEU.some((opt) => opt.id === activeTab);
  const isTemplatesActive = OPCOES_TEMPLATES.some((opt) => opt.id === activeTab);
  const isManutencaoActive = OPCOES_MANUTENCAO.some((opt) => opt.id === activeTab);
    
  const getItemClassName = (tabId: string) => `${styles['nav-item']} ${activeTab === tabId ? styles['active'] : ''}`;

  const handleToggleClick = (tab: string, toggle: (value: (previous: boolean) => boolean) => void) => {
    onSelectTab(tab);
    toggle((previous) => !previous);
  };

  return (
    <aside className={styles['sidebar']}>
      
      <div className={styles['sidebar-header']}>
        <h2>Gestão de Frotas</h2>
      </div>

      <nav className={styles['sidebar-nav']}>

        <button
          type="button"
          className={getItemClassName('dashboard')}
          onClick={() => onSelectTab('dashboard')}
        >
          <span>⌂</span>
          <span className={styles['nav-label']}>Dashboard</span>
        </button>

        {/* Grupo Expansível: Veículos */}
        <div className={styles['nav-group']}>
          <button
            type="button"
            className={`${styles['nav-item']} ${
              isVeiculoActive ? styles['active'] : ''
            }`}
            onClick={()=>handleToggleClick('veiculo', setIsVeiculosOpen)}
            aria-expanded={isVeiculosOpen}
          >
            <span>🚛</span>
            <span className={styles['nav-label']}>Veículos</span>
            <span className={styles['chevron']}>
              {isVeiculosOpen ? '▾' : '▸'}
            </span>
          </button>

          {/* Submenu de Opções 3D */}
          {isVeiculosOpen && (
            <div className={styles['submenu']}>
              {OPCOES_VEICULO.map((opcao) => (
                <button
                  key={opcao.id}
                  type="button"
                  className={`${styles['submenu-item']} ${
                    activeTab === opcao.id ? styles['active'] : ''
                  }`}
                  onClick={() => onSelectTab(opcao.id)}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grupo Expansível: Pneus */}
        <div className={styles['nav-group']}>
          <button
            type="button"
            className={`${styles['nav-item']} ${
              isPneuActive ? styles['active'] : ''
            }`}
            onClick={()=>handleToggleClick('pneu', setIsPneusOpen)}
            aria-expanded={isPneusOpen}
          >
            <span>◉</span>
            <span className={styles['nav-label']}>Pneus</span>
            <span className={styles['chevron']}>
              {isPneusOpen ? '▾' : '▸'}
            </span>
          </button>

          {isPneusOpen && (
            <div className={styles['submenu']}>
              {OPCOES_PNEU.map((opcao) => (
                <button
                  key={opcao.id}
                  type="button"
                  className={`${styles['submenu-item']} ${
                    activeTab === opcao.id ? styles['active'] : ''
                  }`}
                  onClick={() => onSelectTab(opcao.id)}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className={getItemClassName('rodizio')}
          onClick={() => onSelectTab('rodizio')}
        >
          <span>↻</span>
          <span className={styles['nav-label']}>Rodízio</span>
        </button>

        {/* Grupo Expansível: Templates */}
        <div className={styles['nav-group']}>
            
          <button
            type="button"
            className={`${styles['nav-item']} ${
              isTemplatesActive ? styles['active'] : ''
            }`}
            onClick={()=>handleToggleClick('templates', setIsTemplatesOpen)}
            aria-expanded={isTemplatesOpen}
          >
            <span>▦</span>
            <span className={styles['nav-label']}>Templates</span>
            <span className={styles['chevron']}>
              {isTemplatesOpen ? '▾' : '▸'}
            </span>
          </button>

          {isTemplatesOpen && (
            <div className={styles['submenu']}>
              {OPCOES_TEMPLATES.map((opcao) => (
                <button
                  key={opcao.id}
                  type="button"
                  className={`${styles['submenu-item']} ${
                    activeTab === opcao.id ? styles['active'] : ''
                  }`}
                  onClick={() => onSelectTab(opcao.id)}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className={getItemClassName('inspecao')}
          onClick={() => onSelectTab('inspecao')}
        >
          <span>✓</span>
          <span className={styles['nav-label']}>Inspeções</span>
        </button>

        {/* Grupo Expansível: Manutenções */}
        <div className={styles['nav-group']}>
          <button
            type="button"
            className={`${styles['nav-item']} ${
              isManutencaoActive ? styles['active'] : ''
            }`}
            onClick={() => handleToggleClick('manutencao', setIsManutencaoOpen)}
            aria-expanded={isManutencaoOpen}
          >
            <span>⚙</span>
            <span className={styles['nav-label']}>Manutenções</span>
            <span className={styles['chevron']}>
              {isManutencaoOpen ? '▾' : '▸'}
            </span>
          </button>

          {isManutencaoOpen && (
            <div className={styles['submenu']}>
              {OPCOES_MANUTENCAO.map((opcao) => (
                <button
                  key={opcao.id}
                  type="button"
                  className={`${styles['submenu-item']} ${
                    activeTab === opcao.id ? styles['active'] : ''
                  }`}
                  onClick={() => onSelectTab(opcao.id)}
                >
                  {opcao.label}
                </button>
              ))}
            </div>
          )}
        </div>


        <button
          type="button"
          className={getItemClassName('desgaste')}
          onClick={() => onSelectTab('desgaste')}
        >
          <span>↘</span>
          <span className={styles['nav-label']}>Desgaste</span>
        </button>
      </nav>

        {isAdmin && (
          <div className={styles['sidebar-footer']}>
            <button
              type="button"
              className={getItemClassName('usuarios')}
              onClick={() => onSelectTab('usuarios')}
            >
              <span>♙</span>
              <span className={styles['nav-label']}>Usuários</span>
            </button>
          </div>
        )}
        
    </aside>
  );
}

export default Sidebar;
