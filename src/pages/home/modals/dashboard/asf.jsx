import { useState } from 'react';
import styles from '../css/Dashboard.module.css';

interface SidebarProps {
  isAdmin: boolean;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

// Opções do modelo 3D / Veículos
const OPCOES_VEICULO = [
  { id: 'veiculo-3d-geral', label: 'Visão Geral 3D' },
  { id: 'veiculo-3d-pneus', label: 'Verificar Pneus' },
  { id: 'veiculo-3d-chassi', label: 'Inspeção do Chassi' },
];

function Sidebar({ isAdmin, activeTab, onSelectTab }: SidebarProps) {
  // Estado para controlar se o submenu de veículos está aberto
  const [isVeiculosOpen, setIsVeiculosOpen] = useState(false);

  const getItemClassName = (tabId: string) =>
    `${styles['nav-item']} ${activeTab === tabId ? styles['active'] : ''}`;

  // Trata o clique no botão principal de Veículos
  const handleVeiculosClick = () => {
    onSelectTab('veiculo'); // Seleciona a aba principal do 3D
    setIsVeiculosOpen((prev) => !prev); // Abre/fecha as subopções
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
          <span>⌂</span> Dashboard
        </button>

        {/* Item Expansível: Veículos */}
        <div className={styles['nav-group']}>
          <button
            type="button"
            className={`${getItemClassName('veiculo')} ${styles['nav-item-expandable']}`}
            onClick={handleVeiculosClick}
            aria-expanded={isVeiculosOpen}
          >
            <span>🚛</span> Veículos
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
          <span>◉</span> Pneus
        </button>

        <button
          type="button"
          className={getItemClassName('rodizio')}
          onClick={() => onSelectTab('rodizio')}
        >
          <span>↻</span> Rodízio
        </button>

        <button
          type="button"
          className={getItemClassName('estoque')}
          onClick={() => onSelectTab('estoque')}
        >
          <span>▦</span> Estoque
        </button>

        <button
          type="button"
          className={getItemClassName('inspecao')}
          onClick={() => onSelectTab('inspecao')}
        >
          <span>✓</span> Inspeções
        </button>

        <button
          type="button"
          className={getItemClassName('manutencao')}
          onClick={() => onSelectTab('manutencao')}
        >
          <span>⚙</span> Manutenções
        </button>

        <button
          type="button"
          className={getItemClassName('desgaste')}
          onClick={() => onSelectTab('desgaste')}
        >
          <span>↘</span> Desgaste
        </button>
      </nav>

      <div className={styles['sidebar-footer']}>
        {isAdmin && (
          <button
            type="button"
            className={getItemClassName('usuarios')}
            onClick={() => onSelectTab('usuarios')}
          >
            <span>♙</span> Usuários
          </button>
        )}

        <button
          type="button"
          className={getItemClassName('config')}
          onClick={() => onSelectTab('config')}
        >
          <span>⚙</span> Configurações
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
