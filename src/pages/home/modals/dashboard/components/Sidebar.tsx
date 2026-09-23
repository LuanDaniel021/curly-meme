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

function Sidebar({ isAdmin, activeTab, onSelectTab }: SidebarProps) {
  const [isVeiculosOpen, setIsVeiculosOpen] = useState(false);

  // O item de veículos fica destacado se ele mesmo ou alguma sub-aba estiver ativa
  const isVeiculoActive =
    activeTab === 'veiculo' || OPCOES_VEICULO.some((opt) => opt.id === activeTab);

  const getItemClassName = (tabId: string) =>
    `${styles['nav-item']} ${activeTab === tabId ? styles['active'] : ''}`;

  const handleVeiculosClick = () => {
    onSelectTab('veiculo');
    setIsVeiculosOpen((prev) => !prev);
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
            onClick={handleVeiculosClick}
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

        <button
          type="button"
          className={getItemClassName('pneu')}
          onClick={() => onSelectTab('pneu')}
        >
          <span>◉</span>
          <span className={styles['nav-label']}>Pneus</span>
        </button>

        <button
          type="button"
          className={getItemClassName('rodizio')}
          onClick={() => onSelectTab('rodizio')}
        >
          <span>↻</span>
          <span className={styles['nav-label']}>Rodízio</span>
        </button>

        <button
          type="button"
          className={getItemClassName('estoque')}
          onClick={() => onSelectTab('estoque')}
        >
          <span>▦</span>
          <span className={styles['nav-label']}>Estoque</span>
        </button>

        <button
          type="button"
          className={getItemClassName('inspecao')}
          onClick={() => onSelectTab('inspecao')}
        >
          <span>✓</span>
          <span className={styles['nav-label']}>Inspeções</span>
        </button>

        <button
          type="button"
          className={getItemClassName('manutencao')}
          onClick={() => onSelectTab('manutencao')}
        >
          <span>⚙</span>
          <span className={styles['nav-label']}>Manutenções</span>
        </button>

        <button
          type="button"
          className={getItemClassName('desgaste')}
          onClick={() => onSelectTab('desgaste')}
        >
          <span>↘</span>
          <span className={styles['nav-label']}>Desgaste</span>
        </button>
      </nav>

      <div className={styles['sidebar-footer']}>
        {isAdmin && (
          <button
            type="button"
            className={getItemClassName('usuarios')}
            onClick={() => onSelectTab('usuarios')}
          >
            <span>♙</span>
            <span className={styles['nav-label']}>Usuários</span>
          </button>
        )}

        <button
          type="button"
          className={getItemClassName('config')}
          onClick={() => onSelectTab('config')}
        >
          <span>⚙</span>
          <span className={styles['nav-label']}>Configurações</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
