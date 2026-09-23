
import styles from '../css/Dashboard.module.css';

import PneusView from './outlet-components/Pneus';

import ManutencoesView from './outlet-components/Manutencoes';
import DesgasteView from './outlet-components/DesgasteView';

import UsuariosView from './outlet-components/Usuarios';

import AxisBuilder from './outlet-components/TemplateView/AxisBuilder';
import VerificarView from './outlet-components/VeiculosView/VerificarView';
import Veiculos, { Veiculos3dView } from './outlet-components/Veiculos';

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
      case 'veiculo-3d-geral': return <Veiculos3dView />;
      case 'veiculo-3d-pneus': return <VerificarView />;
      case 'veiculo'    : return <Veiculos />;
      case 'pneu'       : return <PneusView />;
      case 'pneu-analise': return <DesgasteView />;
      case 'manutencao' : return <ManutencoesView />;
      case 'desgaste'   : return <DesgasteView />;
      case 'usuarios'   : return <UsuariosView />;
      case 'templates-criar'  : return <AxisBuilder />
      default           : return <OutletView />
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
