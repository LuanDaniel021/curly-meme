
import styles from './Dashboard.module.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContainer from './components/main-container/MainContainer';
import { api } from '../../service/api';
import { useEffect, useState } from 'react';

function Dashboard() {

  const [activeTab, setActiveTab] = useState('home');

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(
    () => {
      const fetchUser = async () => {
        try {

          // await api.get('users/info')
          //   .catch(
          //     (data) => {
          //       console.log(data)
          //       setIsAdmin(!(data.role === "user"));
          //     }
          //   );

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

        <Header />

        <MainContainer activeTab={activeTab} />

      </div>

    </div>
  );
}

export default Dashboard;