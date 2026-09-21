
import styles from '../../Dashboard.module.css';

import DashboardView from './DashboardView';
import UsuariosView from './usuarios/UsuariosView';
import VeiculosView  from './VeiculosView';

function MainContainer({ activeTab } : {activeTab:string})
{
  return (
    <main className={styles['main-content']}>

      {activeTab === 'dashboard'  && <DashboardView />}

      {activeTab === 'veiculo'    && <VeiculosView />}
      {activeTab === 'pneu'       && <DashboardView />}
      {activeTab === 'rodizio'    && <DashboardView />}
      {activeTab === 'estoque'    && <DashboardView />}
      {activeTab === 'inspecao'   && <DashboardView />}
      {activeTab === 'menutencao' && <DashboardView />}
      {activeTab === 'usuarios'   && <UsuariosView />}

    </main>
  );

}

export default MainContainer;
