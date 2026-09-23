import { useEffect, useState } from 'react';
import { api } from '../../../../../../service/api';
import styles from '../../css/AssetManagement.module.css';

interface Tire {
  id: number | string;
  codigoFogo?: string;
  fogo?: string;
  marca?: string;
  modelo?: string;
  medida?: string;
  veiculo?: string;
  posicao?: string;
  sulcoAtual?: number | string;
  status?: string;
  status_pneu?: string;
}

interface PneuManagementProps {
  onRegister: () => void;
  onDetails: (tireId: string) => void;
}

function normalizeTires(response: unknown): Tire[] {
  if (Array.isArray(response)) return response as Tire[];
  if (!response || typeof response !== 'object') return [];
  const data = 'data' in response ? response.data : response;
  if (Array.isArray(data)) return data as Tire[];
  if (data && typeof data === 'object') {
    const object = data as Record<string, unknown>;
    for (const key of ['items', 'results', 'rows', 'pneus']) {
      if (Array.isArray(object[key])) return object[key] as Tire[];
    }
  }
  return [];
}

export default function PneuManagement({ onRegister, onDetails }: PneuManagementProps) {
  const [pneus, setPneus] = useState<Tire[]>([]);
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTires = async () => {
      try {
        const response = await api.get('pneus');
        setPneus(normalizeTires(response));
      } catch (requestError) {
        console.error('Erro ao carregar pneus:', requestError);
        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os pneus.');
      } finally {
        setLoading(false);
      }
    };
    loadTires();
  }, []);

  const filteredTires = pneus.filter((pneu) => {
    const text = busca.toLowerCase();
    const matchesSearch = [pneu.codigoFogo, pneu.fogo, pneu.marca, pneu.modelo, pneu.medida, pneu.veiculo]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(text));
    const currentStatus = (pneu.status || pneu.status_pneu || '').toLowerCase();
    return matchesSearch && (status === 'todos' || currentStatus === status);
  });

  const inUse = pneus.filter((pneu) => (pneu.veiculo || '').trim()).length;
  const inStock = pneus.filter((pneu) => !(pneu.veiculo || '').trim()).length;
  const attention = pneus.filter((pneu) => Number(pneu.sulcoAtual || 0) > 0 && Number(pneu.sulcoAtual) < 3).length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div><span className={styles.eyebrow}>Controle operacional</span><h1 className={styles.title}>Gestão de Pneus</h1><p className={styles.subtitle}>Acompanhe estoque, aplicação e condições dos pneus da frota.</p></div>
        <button type="button" className={styles.primaryButton} onClick={onRegister}>+ Registrar pneu</button>
      </header>

      <section className={styles.metrics}>
        <div className={styles.metric}><span className={styles.metricLabel}>Total de pneus</span><strong className={styles.metricValue}>{pneus.length}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Em uso</span><strong className={styles.metricValue}>{inUse}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Em estoque</span><strong className={styles.metricValue}>{inStock}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Atenção</span><strong className={styles.metricValue}>{attention}</strong></div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Pneus cadastrados</h2></div>
        <div className={styles.filters}><input className={styles.search} value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar por código, marca ou veículo" /><select className={styles.select} value={status} onChange={(event) => setStatus(event.target.value)}><option value="todos">Todos os status</option><option value="estoque">Em estoque</option><option value="aplicado">Aplicado</option><option value="manutencao">Em manutenção</option></select></div>
        {error && <div className={styles.error}>{error}</div>}
        {loading ? <div className={styles.empty}>Carregando pneus...</div> : filteredTires.length === 0 ? <div className={styles.empty}>Nenhum pneu encontrado.</div> : (
          <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Pneu</th><th>Marca / medida</th><th>Aplicação</th><th>Sulco</th><th>Status</th><th>Ação</th></tr></thead><tbody>{filteredTires.map((pneu) => <tr key={pneu.id}><td><span className={styles.primaryText}>{pneu.codigoFogo || pneu.fogo || pneu.id}</span><span className={styles.secondaryText}>ID {pneu.id}</span></td><td><span className={styles.primaryText}>{pneu.marca || 'Marca não informada'}</span><span className={styles.secondaryText}>{pneu.medida || pneu.modelo || 'Medida não informada'}</span></td><td><span className={styles.primaryText}>{pneu.veiculo || 'Estoque'}</span><span className={styles.secondaryText}>{pneu.posicao || 'Sem posição'}</span></td><td>{pneu.sulcoAtual ? `${pneu.sulcoAtual} mm` : 'Não informado'}</td><td><span className={styles.status}>{pneu.status || pneu.status_pneu || (pneu.veiculo ? 'Aplicado' : 'Estoque')}</span></td><td><button type="button" className={styles.actionButton} onClick={() => onDetails(String(pneu.id))}>Detalhes</button></td></tr>)}</tbody></table></div>
        )}
      </section>
    </div>
  );
}
