
import styles from '../css/Dashboard.module.css';
import { useEffect, useState } from 'react';
import { api } from '../../../../../service/api';
import PneuCadastro from './outlet-components/PneusView/cadastro/PneuCadastro';
import PneuMeasurementsManagement from './outlet-components/PneuMeasurementsManagement';


import Pneus from './outlet-components/Pneus';

import Manutencoes from './outlet-components/Manutencoes';
import DesgasteView from './outlet-components/PneusView/DesgasteView';

import Usuarios from './outlet-components/Usuarios';

import TemplateManagement from './outlet-components/TemplateView/TemplateManagement';
import VerificarView from './outlet-components/VeiculosView/VerificarView';
import VehicleTiresManagement from './outlet-components/VehicleTiresManagement';
import Veiculos, { Veiculos3dView } from './outlet-components/Veiculos';
import VeiculoCadastro from './outlet-components/VeiculosView/cadastro/VeiculoCadastro';

interface DashboardMetrics {
  veiculos: number;
  pneus: number;
  inspecoes: number;
  manutencoes: number;
}

const metricasIniciais: DashboardMetrics = {
  veiculos: 0,
  pneus: 0,
  inspecoes: 0,
  manutencoes: 0,
};

function contarRegistros(response: unknown): number {
  if (Array.isArray(response)) return response.length;
  if (!response || typeof response !== 'object') return 0;

  const dados = 'data' in response ? response.data : response;
  if (Array.isArray(dados)) return dados.length;
  if (!dados || typeof dados !== 'object') return 0;

  const objeto = dados as Record<string, unknown>;
  for (const chave of ['total', 'count', 'totalCount']) {
    if (typeof objeto[chave] === 'number') return objeto[chave];
  }

  for (const chave of ['items', 'results', 'rows', 'veiculos', 'pneus', 'inspecoes', 'manutencoes']) {
    if (Array.isArray(objeto[chave])) return objeto[chave].length;
  }

  return 0;
}

function useDashboardMetrics(): DashboardMetrics {
  const [metricas, setMetricas] = useState(metricasIniciais);

  useEffect(() => {
    const carregarMetricas = async () => {
      const [veiculos, pneus, inspecoes, manutencoes] = await Promise.allSettled([
        api.get('veiculos'),
        api.get('pneus'),
        api.get('inspecoes'),
        api.get('manutencoes'),
      ]);

      setMetricas({
        veiculos: veiculos.status === 'fulfilled' ? contarRegistros(veiculos.value) : 0,
        pneus: pneus.status === 'fulfilled' ? contarRegistros(pneus.value) : 0,
        inspecoes: inspecoes.status === 'fulfilled' ? contarRegistros(inspecoes.value) : 0,
        manutencoes: manutencoes.status === 'fulfilled' ? contarRegistros(manutencoes.value) : 0,
      });
    };

    carregarMetricas();
  }, []);

  return metricas;
}

function OutletView({ onSelectTab }: { onSelectTab: (tab: string) => void }) {
    const metricas = useDashboardMetrics();

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
              {metricas.veiculos}
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
              {metricas.pneus}
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
              {metricas.inspecoes}
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
              {metricas.manutencoes}
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

              <button
                type="button"
                className={styles['quick-action']}
                onClick={() => onSelectTab('veiculo-registrar')}
              >
                Cadastrar caminhão
              </button>

              <button
                type="button"
                className={styles['quick-action']}
                onClick={() => onSelectTab('pneu-registrar')}
              >
                Cadastrar pneu
              </button>

              <button
                type="button"
                className={styles['quick-action']}
                onClick={() => onSelectTab('veiculo-verificar')}
              >
                Gerenciar pneus do veículo
              </button>

              <button
                type="button"
                className={styles['quick-action']}
                onClick={() => onSelectTab('manutencao')}
              >
                Registrar manutenção
              </button>

            </div>
          </article>

        </section>
      </div>
    )
}

function Outlet({ activeTab, selectedTireId, selectedTirePosition, selectedVehiclePlate, onSelectTab }: { activeTab: string; selectedTireId?: string; selectedTirePosition?: string; selectedVehiclePlate?: string; onSelectTab: (tab: string, tireId?: string, position?: string, plate?: string) => void })
{
  const handler = (tab: string) => {
    switch (tab) {
        case 'veiculo-registrar': return <VeiculoCadastro />; 
        case 'veiculo-3d-geral': return <Veiculos3dView onSelectTire={(tireId, position, plate) => onSelectTab(tireId ? 'pneu-medicao' : 'veiculo-verificar', tireId || '', position, plate)} />;
        case 'veiculo-verificar': return <VehicleTiresManagement initialPlate={selectedVehiclePlate} initialPosition={selectedTirePosition} onRegisterVehicle={() => onSelectTab('veiculo-registrar')} />;
        case 'veiculo'    : return <Veiculos onRegister={() => onSelectTab('veiculo-registrar')} onDetails={(plate) => onSelectTab('veiculo-verificar', undefined, undefined, plate)} />;

        case 'pneu-registrar': return <PneuCadastro />; 
        case 'pneu-medicoes': return <PneuMeasurementsManagement />;
        case 'pneu-medicao': return <VerificarView selectedTireId={selectedTireId} selectedTirePosition={selectedTirePosition} selectedVehiclePlate={selectedVehiclePlate} />;
        case 'pneu'       : return <Pneus onRegister={() => onSelectTab('pneu-registrar')} onDetails={(tireId) => onSelectTab('pneu-medicao', tireId)} />;
      
        case 'pneu-analise': return <DesgasteView />;
        case 'desgaste'   : return <DesgasteView />;

        case 'templates-registrar'  : return <TemplateManagement />;
        case 'templates'  : return <TemplateManagement />;
      
        case 'manutencao-preventiva' : return <Manutencoes initialMode="preventiva" />;
        case 'manutencao-corretiva' : return <Manutencoes initialMode="corretiva" />;
        case 'manutencao-agendamentos' : return <Manutencoes initialMode="agendamentos" />;
        case 'manutencao' : return <Manutencoes initialMode="preventiva" />
            
        case 'usuarios'   : return <Usuarios />;
            
        default           : return <OutletView onSelectTab={onSelectTab} />;
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
