
import styles from '../../Dashboard.module.css';

import VeiculosView  from './main-container/veiculos/VeiculosView';
import PneusView from './main-container/pneus/PneusView';
import RodizioView from './main-container/rodizio/RodizioView';
import EstoqueView from './main-container/estoque/EstoqueView';
import InspecoesView from './main-container/inspecoes/InspecoesView';
import ManutencoesView from './main-container/manutencoes/ManutencoesView';
import DesgasteView from './main-container/desgaste/DesgasteView';

import UsuariosView from './main-container/usuarios/UsuariosView';

function OutletView() {
    return (
      <>
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
      </>
    )
}

function Outlet({ activeTab } : {activeTab:string})
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
