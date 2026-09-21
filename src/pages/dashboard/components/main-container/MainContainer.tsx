
import styles from '../../Dashboard.module.css';

import MainView from './MainView';

import VeiculosView  from './veiculos/VeiculosView';
import PneusView from './pneus/PneusView';
import RodizioView from './rodizio/RodizioView';
import EstoqueView from './estoque/EstoqueView';
import InspecoesView from './inspecoes/InspecoesView';
import ManutencoesView from './manutencoes/ManutencoesView';

import UsuariosView from './usuarios/UsuariosView';

function MainContainer({ activeTab } : {activeTab:string})
{
  return (
    <main className={styles['main-content']}>

      {activeTab === 'dashboard'  && <MainView />}

      {activeTab === 'veiculo'    && <VeiculosView />}
      {activeTab === 'pneu'       && <PneusView />}
      {activeTab === 'rodizio'    && <RodizioView />}
      {activeTab === 'estoque'    && <EstoqueView />}
      {activeTab === 'inspecao'   && <InspecoesView />}
      {activeTab === 'menutencao' && <ManutencoesView />}
      {activeTab === 'usuarios'   && <UsuariosView />}

    </main>
  );

}

export default MainContainer;
