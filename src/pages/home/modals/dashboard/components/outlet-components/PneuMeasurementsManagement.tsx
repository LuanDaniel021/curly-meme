import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../../../../../../service/api';
import styles from '../../css/AssetManagement.module.css';

interface Tire {
  id: number | string;
  fogo?: string;
  codigoFogo?: string;
  marca?: string;
  medida?: string;
}

interface Measurement {
  id: number | string;
  pressao?: number | string;
  pressure?: number | string;
  sulco?: number | string;
  tread?: number | string;
  km?: number | string;
  mileage?: number | string;
  data?: string;
  created_at?: string;
}

function normalizeList<T>(response: unknown, keys: string[]): T[] {
  if (Array.isArray(response)) return response as T[];
  if (!response || typeof response !== 'object') return [];
  const data = 'data' in response ? response.data : response;
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === 'object') {
    const object = data as Record<string, unknown>;
    for (const key of keys) {
      if (Array.isArray(object[key])) return object[key] as T[];
    }
  }
  return [];
}

function tireName(tire: Tire): string {
  return tire.codigoFogo || tire.fogo || `Pneu ${tire.id}`;
}

export default function PneuMeasurementsManagement() {
  const [tires, setTires] = useState<Tire[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [tireId, setTireId] = useState('');
  const [pressure, setPressure] = useState('');
  const [tread, setTread] = useState('');
  const [mileage, setMileage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTires = async () => {
      try {
        const response = await api.get('pneus');
        const loadedTires = normalizeList<Tire>(response, ['items', 'results', 'pneus']);
        setTires(loadedTires);
        if (loadedTires.length > 0) setTireId(String(loadedTires[0].id));
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os pneus.');
      } finally {
        setLoading(false);
      }
    };
    loadTires();
  }, []);

  const loadMeasurements = async (selectedId: string) => {
    if (!selectedId) return;
    try {
      setError('');
      const response = await api.get(`pneus/${encodeURIComponent(selectedId)}/medicoes`);
      setMeasurements(normalizeList<Measurement>(response, ['items', 'results', 'medicoes']));
    } catch (requestError) {
      setMeasurements([]);
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar as medições.');
    }
  };

  useEffect(() => {
    loadMeasurements(tireId);
  }, [tireId]);

  const selectedTire = tires.find((tire) => String(tire.id) === tireId);

  const saveMeasurement = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tireId) return;

    try {
      setSaving(true);
      setError('');
      await api.post(`pneus/${encodeURIComponent(tireId)}/medicoes`, {
        pressao: pressure.trim(),
        sulco: tread.trim(),
        km: mileage.trim(),
      });
      setPressure('');
      setTread('');
      setMileage('');
      await loadMeasurements(tireId);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível salvar a medição.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div><span className={styles.eyebrow}>Controle de pneus</span><h1 className={styles.title}>Medições dos pneus</h1><p className={styles.subtitle}>Acompanhe pressão, sulco e quilometragem de cada pneu.</p></div>
      </header>

      {error && <div className={styles.error}>{error}</div>}
      <section className={styles.panel}>
        <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Selecionar pneu</h2></div>
        <select className={styles.select} value={tireId} onChange={(event) => setTireId(event.target.value)} disabled={loading}><option value="">{loading ? 'Carregando pneus...' : 'Selecione um pneu'}</option>{tires.map((tire) => <option key={tire.id} value={tire.id}>{tireName(tire)} {tire.marca ? `• ${tire.marca}` : ''}</option>)}</select>
      </section>

      <section className={styles.metrics}>
        <div className={styles.metric}><span className={styles.metricLabel}>Pneu selecionado</span><strong className={styles.metricValue}>{selectedTire ? tireName(selectedTire) : '—'}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Medições</span><strong className={styles.metricValue}>{measurements.length}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Último sulco</span><strong className={styles.metricValue}>{measurements[0]?.sulco ?? measurements[0]?.tread ?? '—'}{measurements[0] ? ' mm' : ''}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Última pressão</span><strong className={styles.metricValue}>{measurements[0]?.pressao ?? measurements[0]?.pressure ?? '—'}{measurements[0] ? ' PSI' : ''}</strong></div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Histórico de medições</h2></div>
          {measurements.length === 0 ? <div className={styles.empty}>Nenhuma medição registrada para este pneu.</div> : <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Data</th><th>Pressão</th><th>Sulco</th><th>KM</th></tr></thead><tbody>{measurements.map((measurement) => <tr key={measurement.id}><td>{measurement.data || measurement.created_at || '—'}</td><td>{measurement.pressao ?? measurement.pressure ?? '—'} PSI</td><td>{measurement.sulco ?? measurement.tread ?? '—'} mm</td><td>{measurement.km ?? measurement.mileage ?? '—'}</td></tr>)}</tbody></table></div>}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Registrar medição</h2></div>
          <form className={styles.form} onSubmit={saveMeasurement}>
            <div className={styles.formGroup}><label htmlFor="measurement-pressure">Pressão (PSI)</label><input id="measurement-pressure" className={styles.search} type="number" step="0.1" min="0" value={pressure} onChange={(event) => setPressure(event.target.value)} required /></div>
            <div className={styles.formGroup}><label htmlFor="measurement-tread">Sulco (mm)</label><input id="measurement-tread" className={styles.search} type="number" step="0.1" min="0" value={tread} onChange={(event) => setTread(event.target.value)} required /></div>
            <div className={styles.formGroup}><label htmlFor="measurement-mileage">Quilometragem</label><input id="measurement-mileage" className={styles.search} type="number" min="0" value={mileage} onChange={(event) => setMileage(event.target.value)} required /></div>
            <button type="submit" className={styles.primaryButton} disabled={saving || !tireId}>{saving ? 'Salvando...' : 'Salvar medição'}</button>
          </form>
        </section>
      </div>
    </div>
  );
}
