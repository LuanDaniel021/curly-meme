
import styles from '../css/Dashboard.module.css';
import PneuCadastro from './outlet-components/PneusView/cadastro/PneuCadastro';


import Pneus from './outlet-components/Pneus';

import Manutencoes from './outlet-components/Manutencoes';
import Desgaste from './outlet-components/PneusView/DesgasteView';

import Usuarios from './outlet-components/Usuarios';

import AxisBuilder from './outlet-components/TemplateView/AxisBuilder';import VerificarView from './outlet-components/VeiculosView/VerificarView';
import Veiculos, { Veiculos3dView } from './outlet-components/Veiculos';
import VeiculosCadastro from './outlet-components/VeiculosView/cadastro/VeiculoCadastro';

function OutletView() {
    return (
      <div className={styles['container']}>
        <section className={styles['welcome-section']}>
          <h2>Olá, seja bem-vindo!</h2>
          <p>
            Acompanhe as principais informações da sua operação.
          </p>
        </section>

        <section className={styles['summary-grid']}>

          <article className={styles['summary-card']}>
            <span className={styles['summary-label']}>
              Caminhões
            </span>

            <strong className={styles['summary-value']}>
              0
            </strong>

            <span className={styles['summary-description']}>
              Veículos cadastrados
            </span>
          </article>

          <article className={styles['summary-card']}>
            <span className={styles['summary-label']}>
              Pneus
            </span>

            <strong className={styles['summary-value']}>
              0
            </strong>

            <span className={styles['summary-description']}>
              Pneus registrados
            </span>
          </article>

          <article className={styles['summary-card']}>
            <span className={styles['summary-label']}>
              Inspeções
            </span>

            <strong className={styles['summary-value']}>
              0
            </strong>

            <span className={styles['summary-description']}>
              Inspeções realizadas
            </span>
          </article>

          <article className={styles['summary-card']}>
            <span className={styles['summary-label']}>
              Manutenções
            </span>

            <strong className={styles['summary-value']}>
              0
            </strong>

            <span className={styles['summary-description']}>
              Manutenções pendentes
            </span>
          </article>

        </section>

        <section className={styles['content-grid']}>

          <article className={styles['content-card']}>
            <div className={styles['card-header']}>
              <h2>Atividade recente</h2>

              <button
                type="button"
                className={styles['card-action']}
              >
                Ver tudo
              </button>
            </div>

            <div className={styles['empty-state']}>
              <span className={styles['empty-icon']}>
                ◌
              </span>

              <p>
                Nenhuma atividade registrada.
              </p>
            </div>
          </article>

          <article className={styles['content-card']}>
            <div className={styles['card-header']}>
              <h2>Ações rápidas</h2>
            </div>

            <div className={styles['quick-actions']}>

              <a
                href="/caminhao"
                className={styles['quick-action']}
              >
                Cadastrar caminhão
              </a>

              <a
                href="/pneu"
                className={styles['quick-action']}
              >
                Cadastrar pneu
              </a>

              <a
                href="/inspecao"
                className={styles['quick-action']}
              >
                Nova inspeção
              </a>

              <a
                href="/manutencao"
                className={styles['quick-action']}
              >
                Registrar manutenção
              </a>

            </div>
          </article>

        </section>
      </div>
    )
}

function Outlet({ activeTab } : {activeTab:string})
{
  const handler = (tab: string) => {
    switch (tab) {
        case 'veiculo-registrar': return <VeiculoCadastro />; 
        case 'veiculo-3d-geral': return <Veiculos3dView />;
        case 'veiculo-verificar': return <VerificarView />;
        case 'veiculo'    : return <Veiculos />;

        case 'pneu-registrar': return <PneuCadastro />; 
        case 'pneu-medicao': return <VerificarView />;      
        case 'pneu'       : return <Pneus />;
      
        case 'pneu-analise': return <DesgasteView />;
        case 'desgaste'   : return <DesgasteView />;

        case 'templates-registrar'  : return <AxisBuilder />;    
        case 'templates'  : return <AxisBuilder />;
      
        case 'manutencao-preventiva' : return <Manutencoes />;
        case 'manutencao-corretiva' : return <Manutencoes />;          
        case 'manutencao' : return <Manutencoes />
            
        case 'usuarios'   : return <Usuarios />;
            
        default           : return <OutletView />;
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

export default Outlet;
