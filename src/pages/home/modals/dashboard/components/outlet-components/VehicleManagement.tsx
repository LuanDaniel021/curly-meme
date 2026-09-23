import { useEffect, useState } from 'react';
import { api } from '../../../../../../service/api';
import styles from '../../css/AssetManagement.module.css';

interface Vehicle {
  id: number | string;
  placa?: string;
  marca?: string;
  modelo?: string;
  tipo?: string;
  ano?: number | string;
  ano_modelo?: number | string;
  status?: string;
  dataCriacao?: string;
  template?: string | { nome?: string; nome_template?: string };
  crlv?: { placa?: string; marca?: string; tipo?: string; ano_modelo?: number | string };
}

interface VehicleManagementProps {
  onRegister: () => void;
  onDetails: (plate: string) => void;
}

function normalizeVehicles(response: unknown): Vehicle[] {
  if (Array.isArray(response)) return response as Vehicle[];
  if (!response || typeof response !== 'object') return [];
  const data = 'data' in response ? response.data : response;
  if (Array.isArray(data)) return data as Vehicle[];
  if (data && typeof data === 'object') {
    const object = data as Record<string, unknown>;
    for (const key of ['items', 'results', 'rows', 'veiculos']) {
      if (Array.isArray(object[key])) return object[key] as Vehicle[];
    }
  }
  return [];
}

export default function VehicleManagement({ onRegister, onDetails }: VehicleManagementProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await api.get('veiculos');
        setVehicles(normalizeVehicles(response));
      } catch (requestError) {
        console.error('Erro ao carregar veículos:', requestError);
        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os veículos.');
      } finally {
        setLoading(false);
      }
    };
    loadVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const data = vehicle.crlv || vehicle;
    const text = busca.toLowerCase();
    const matchesSearch = [data.placa, data.marca, vehicle.modelo, data.tipo, vehicle.id]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(text));
    const currentStatus = (vehicle.status || 'Ativo').toLowerCase();
    return matchesSearch && (status === 'todos' || currentStatus === status);
  });

  const active = vehicles.filter((vehicle) => (vehicle.status || 'Ativo').toLowerCase() === 'ativo').length;
  const inactive = vehicles.length - active;
  const templateName = (vehicle: Vehicle) => {
    if (typeof vehicle.template === 'string') return vehicle.template;
    return vehicle.template?.nome_template || vehicle.template?.nome || 'Não informado';
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div><span className={styles.eyebrow}>Controle operacional</span><h1 className={styles.title}>Gestão de Veículos</h1><p className={styles.subtitle}>Centralize os veículos cadastrados e acompanhe o status da frota.</p></div>
        <button type="button" className={styles.primaryButton} onClick={onRegister}>+ Registrar veículo</button>
      </header>

      <section className={styles.metrics}>
        <div className={styles.metric}><span className={styles.metricLabel}>Total de veículos</span><strong className={styles.metricValue}>{vehicles.length}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Ativos</span><strong className={styles.metricValue}>{active}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Inativos</span><strong className={styles.metricValue}>{inactive}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Com CRLV</span><strong className={styles.metricValue}>{vehicles.filter((vehicle) => vehicle.crlv || vehicle.placa).length}</strong></div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Veículos cadastrados</h2></div>
        <div className={styles.filters}><input className={styles.search} value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar por placa, marca ou tipo" /><select className={styles.select} value={status} onChange={(event) => setStatus(event.target.value)}><option value="todos">Todos os status</option><option value="ativo">Ativos</option><option value="inativo">Inativos</option></select></div>
        {error && <div className={styles.error}>{error}</div>}
        {loading ? <div className={styles.empty}>Carregando veículos...</div> : filteredVehicles.length === 0 ? <div className={styles.empty}>Nenhum veículo encontrado.</div> : (
          <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Veículo</th><th>Placa</th><th>Tipo</th><th>Template</th><th>Ano</th><th>Status</th><th>Ação</th></tr></thead><tbody>{filteredVehicles.map((vehicle) => { const data = vehicle.crlv || vehicle; const plate = data.placa || ''; return <tr key={vehicle.id}><td><span className={styles.primaryText}>{data.marca || 'Marca não informada'} {vehicle.modelo || ''}</span><span className={styles.secondaryText}>ID {vehicle.id}</span></td><td><span className={styles.primaryText}>{plate || 'Não informada'}</span></td><td>{data.tipo || 'Não informado'}</td><td>{templateName(vehicle)}</td><td>{data.ano_modelo || vehicle.ano || 'Não informado'}</td><td><span className={styles.status}>{vehicle.status || 'Ativo'}</span></td><td><button type="button" className={styles.actionButton} onClick={() => onDetails(plate)}>Detalhes</button></td></tr>; })}</tbody></table></div>
        )}
      </section>
    </div>
  );
}
