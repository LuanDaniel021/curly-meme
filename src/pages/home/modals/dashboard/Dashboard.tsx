
import styles from './css/Dashboard.module.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Outlet from './components/Outlet';

import { useEffect, useState } from 'react';

import { api } from '../../../../service/api';

interface DashboardProps {
  onSelectModal: (tab: string) => void;
}

function Dashboard( { onSelectModal } : DashboardProps ) {

  const [activeTab, setActiveTab] = useState('home');

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(
    () => {
      const fetchUser = async () => {
        try {
          const data = await api.get('users/info')
          setIsAdmin(!(data.role === "user"));
        }
        catch (error) {
          console.error('Erro ao obter informacoes:', error);
        }
      };

    fetchUser();
  }, []);

  return (
    <div className={styles['dashboard']}>

      <Sidebar
        isAdmin={isAdmin}
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
      />

      <div className={styles['dashboard-body']}>

        <Header 
          onSelectModal={onSelectModal}
        />

        <Outlet activeTab={activeTab} />

      </div>

    </div>
  );
}

export default Dashboard;