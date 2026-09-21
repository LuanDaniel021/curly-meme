
import styles from '../../Dashboard.module.css';

import MainView from './MainView';

import VeiculosView  from './veiculos/VeiculosView';
import PneusView from './pneus/PneusView';
import RodizioView from './rodizio/RodizioView';
import EstoqueView from './estoque/EstoqueView';
import InspecoesView from './inspecoes/InspecoesView';
import ManutencoesView from './manutencoes/ManutencoesView';
import DesgasteView from './desgaste/DesgasteView';

import UsuariosView from './usuarios/UsuariosView';


function MainContainer({ activeTab } : {activeTab:string})
{
  const handler = (tab: string) => {
    switch (tab) {
      case 'veiculo'    : return <VeiculosView />;
      case 'pneu'       : return <PneusView />;
      case 'rodizio'    : return <RodizioView />;
      case 'estoque'    : return <EstoqueView />;
      case 'inspecao'   : return <InspecoesView />;
      case 'manutencao' : return <ManutencoesView />;
      case 'desgaste'   : return <DesgasteView />;
      case 'usuarios'   : return <UsuariosView />;
      default: return <MainView/>
    }
  }
  return (
    <main className={styles['main-content']}>

      {
        handler(activeTab)
      }

    </main>
  );

}

export default MainContainer;
