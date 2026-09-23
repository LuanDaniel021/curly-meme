import styles from '../css/Dashboard.module.css';

interface SidebarProps {
  isAdmin: boolean;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

function Sidebar({ isAdmin, activeTab, onSelectTab }: SidebarProps) {
  // Lista centralizada de itens da navegação
  const navItems = [
    { id: 'dashboard',  label: 'Dashboard',   icon: '⌂' },
    { id: 'veiculo',   label: 'Veículos',    icon: '🚛' },
    { id: 'pneu',       label: 'Pneus',       icon: '◉' },
    { id: 'rodizio',    label: 'Rodízio',     icon: '↻' },
    { id: 'estoque',    label: 'Estoque',     icon: '▦' },
    { id: 'inspecao',   label: 'Inspeções',   icon: '✓' },
    { id: 'manutencao', label: 'Manutenções', icon: '⚙' },
    { id: 'desgaste',   label: 'Desgaste',    icon: '↘' },
  ];

  return (
    <aside className={styles['sidebar']}>

      <div className={styles['sidebar-header']}>
        <h2>Gestão de Frotas</h2>
      </div>

      <nav className={styles['sidebar-nav']}>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles['nav-item']} ${activeTab === item.id ? styles['active'] : ''}`}
            onClick={() => onSelectTab(item.id)}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>

      <div className={styles['sidebar-footer']}>
        {isAdmin && (
          <button
            type="button"
            className={`${styles['nav-item']} ${activeTab === 'usuarios' ? styles['active'] : ''}`}
            onClick={() => onSelectTab('usuarios')}
          >
            <span>♙</span> Usuários
          </button>
        )}

        <button
          type="button"
          className={`${styles['nav-item']} ${activeTab === 'config' ? styles['active'] : ''}`}
          onClick={() => onSelectTab('config')}
        >
          <span>⚙</span> Configurações
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;