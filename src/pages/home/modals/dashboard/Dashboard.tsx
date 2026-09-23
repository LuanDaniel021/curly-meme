
import styles from './css/Dashboard.module.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Outlet from './components/Outlet';

import { useState } from 'react';
import type { UsuarioAtual } from '../../Home';

interface DashboardPops {
  setModalAtivo: () => void;
  usuario: UsuarioAtual;
}

function Dashboard({ setModalAtivo, usuario }: DashboardPops) {

  const [activeTab, setActiveTab] = useState('home');
  const [selectedTireId, setSelectedTireId] = useState<string>();
  const [selectedTirePosition, setSelectedTirePosition] = useState<string>();
  const [selectedVehiclePlate, setSelectedVehiclePlate] = useState<string>();
  const isAdmin = usuario.role.toLowerCase() !== 'user';

  const selectTab = (tab: string, tireId?: string, position?: string, plate?: string) => {
    if (tireId !== undefined) setSelectedTireId(tireId || undefined);
    if (position) setSelectedTirePosition(position);
    if (plate) setSelectedVehiclePlate(plate);
    setActiveTab(tab);
  };

  return (
    <div className={styles['dashboard']}>

      <Sidebar
        isAdmin={isAdmin}
        activeTab={activeTab} 
        onSelectTab={selectTab}
      />

      <div className={styles['dashboard-body']}>

        <Header usuario={usuario} setModalAtivo={setModalAtivo}/>

        <Outlet activeTab={activeTab} selectedTireId={selectedTireId} selectedTirePosition={selectedTirePosition} selectedVehiclePlate={selectedVehiclePlate} onSelectTab={selectTab} />

      </div>

    </div>
  );
}

export default Dashboard;