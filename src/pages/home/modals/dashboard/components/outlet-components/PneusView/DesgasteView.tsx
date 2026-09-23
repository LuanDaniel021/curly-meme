
import { useEffect, useState } from 'react';
import { api } from '../../../../../../../service/api';
import styles from '../../../css/AssetManagement.module.css';

interface Tire {
    id: number | string;
    fogo?: string;
    codigoFogo?: string;
    marca?: string;
    medida?: string;
}

interface WearResult {
    id?: number | string;
    pneu_id?: number | string;
    pneuId?: number | string;
    id_pneu?: number | string;
    desgaste?: number;
    desgaste_mm?: number;
    percentual?: number;
    vida_util?: number;
    status?: string;
    classificacao?: string;
    [key: string]: unknown;
}

interface Measurement {
    id: number | string;
    data?: string;
    created_at?: string;
    sulco?: number | string;
    tread?: number | string;
    km?: number | string;
}

function normalizeTires(response: unknown): Tire[] {
    if (Array.isArray(response)) return response as Tire[];
    if (!response || typeof response !== 'object') return [];
    const data = 'data' in response ? response.data : response;
    if (Array.isArray(data)) return data as Tire[];
    if (data && typeof data === 'object') {
        const object = data as Record<string, unknown>;
        for (const key of ['items', 'results', 'pneus']) {
            if (Array.isArray(object[key])) return object[key] as Tire[];
        }
    }
    return [];
}

function normalizeWearResults(response: unknown): WearResult[] {
    if (Array.isArray(response)) return response as WearResult[];
    if (!response || typeof response !== 'object') return [];
    const data = 'data' in response ? response.data : response;
    if (Array.isArray(data)) return data as WearResult[];
    if (data && typeof data === 'object') {
        const object = data as Record<string, unknown>;
        for (const key of ['items', 'results', 'desgastes']) {
            if (Array.isArray(object[key])) return object[key] as WearResult[];
        }
        return [data as WearResult];
    }
    return [];
}

function normalizeMeasurements(response: unknown): Measurement[] {
    if (Array.isArray(response)) return response as Measurement[];
    if (!response || typeof response !== 'object') return [];
    const data = 'data' in response ? response.data : response;
    if (Array.isArray(data)) return data as Measurement[];
    if (data && typeof data === 'object') {
        const object = data as Record<string, unknown>;
        for (const key of ['items', 'results', 'medicoes']) {
            if (Array.isArray(object[key])) return object[key] as Measurement[];
        }
    }
    return [];
}

function getWearPercentage(result: WearResult | null): number | undefined {
    if (!result) return undefined;
    if (result.percentual !== undefined) return Number(result.percentual);
    if (result.vida_util !== undefined) return 100 - Number(result.vida_util);
    return undefined;
}

function getWearCondition(percentage: number | undefined): string {
    if (percentage === undefined || Number.isNaN(percentage)) return 'Sem análise';
    if (percentage <= 25) return 'Boa';
    if (percentage <= 50) return 'Atenção';
    if (percentage <= 75) return 'Desgaste elevado';
    return 'Crítica';
}

function DesgasteView() {
    const [pneus, setPneus] = useState<Tire[]>([]);
    const [pneuId, setPneuId] = useState('');
    const [medicoes, setMedicoes] = useState<Measurement[]>([]);
    const [medicaoId1, setMedicaoId1] = useState('');
    const [medicaoId2, setMedicaoId2] = useState('');
    const [resultados, setResultados] = useState<WearResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadTires = async () => {
            try {
                const tiresResponse = await api.get('pneus');
                const loadedTires = normalizeTires(tiresResponse);
                setPneus(loadedTires);
                if (loadedTires.length > 0) setPneuId(String(loadedTires[0].id));
            } catch (requestError) {
                console.error('Erro ao carregar pneus:', requestError);
                setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os pneus.');
            } finally {
                setLoading(false);
            }
        };
        loadTires();
    }, []);

    useEffect(() => {
        if (!pneuId) return;

        const loadMeasurements = async () => {
            try {
                setError('');
                const response = await api.get(`pneus/${encodeURIComponent(pneuId)}/medicoes`);
                const loadedMeasurements = normalizeMeasurements(response);
                setMedicoes(loadedMeasurements);
                const lastMeasurements = loadedMeasurements.slice(-2);
                setMedicaoId1(lastMeasurements[0] ? String(lastMeasurements[0].id) : '');
                setMedicaoId2(lastMeasurements[1] ? String(lastMeasurements[1].id) : '');
                setResultados([]);
            } catch (requestError) {
                console.error('Erro ao carregar medições:', requestError);
                setMedicoes([]);
                setResultados([]);
                setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar as medições.');
            }
        };

        loadMeasurements();
    }, [pneuId]);

    useEffect(() => {
        if (!pneuId || !medicaoId1 || !medicaoId2 || medicaoId1 === medicaoId2) {
            setResultados([]);
            return;
        }

        const compareMeasurements = async () => {
            try {
                setError('');
                const query = `?medicaoId1=${encodeURIComponent(medicaoId1)}&medicaoId2=${encodeURIComponent(medicaoId2)}`;
                const response = await api.get(`pneus/${encodeURIComponent(pneuId)}/medicoes/calculo/comparar${query}`);
                setResultados(normalizeWearResults(response));
            } catch (requestError) {
                console.error('Erro ao comparar medições:', requestError);
                setResultados([]);
                setError(requestError instanceof Error ? requestError.message : 'Não foi possível comparar as medições.');
            }
        };

        compareMeasurements();
    }, [pneuId, medicaoId1, medicaoId2]);

    const selectedTire = pneus.find((pneu) => String(pneu.id) === pneuId);
    const resultado = resultados.find((item) => String(item.pneu_id || item.pneuId || item.id_pneu || item.id) === pneuId) || resultados[0] || null;
    const wearValue = resultado?.desgaste_mm ?? resultado?.desgaste;
    const percentage = getWearPercentage(resultado);
    const condition = getWearCondition(percentage);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div><span className={styles.eyebrow}>Controle de pneus</span><h1 className={styles.title}>Cálculo de desgaste</h1><p className={styles.subtitle}>Compare medições e acompanhe a perda de sulco de cada pneu.</p></div>
            </header>

            {error && <div className={styles.error}>{error}</div>}
            <section className={styles.panel}>
                <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Análise automática</h2></div>
                <div className={styles.formGroup}><label htmlFor="pneu-desgaste">Pneu</label><select id="pneu-desgaste" className={styles.select} value={pneuId} onChange={(event) => setPneuId(event.target.value)} required disabled={loading}><option value="">{loading ? 'Carregando pneus...' : 'Selecione um pneu'}</option>{pneus.map((pneu) => <option key={pneu.id} value={pneu.id}>{pneu.codigoFogo || pneu.fogo || `Pneu ${pneu.id}`} {pneu.marca ? `• ${pneu.marca}` : ''}</option>)}</select></div>
                <div className={styles.formGroup}><label htmlFor="medicao-1">Primeira medição</label><select id="medicao-1" className={styles.select} value={medicaoId1} onChange={(event) => setMedicaoId1(event.target.value)} disabled={medicoes.length < 2}><option value="">Selecione a medição</option>{medicoes.map((medicao) => <option key={medicao.id} value={medicao.id}>#{medicao.id} • {medicao.data || medicao.created_at || 'Sem data'} • {medicao.sulco ?? medicao.tread ?? '—'} mm</option>)}</select></div>
                <div className={styles.formGroup}><label htmlFor="medicao-2">Segunda medição</label><select id="medicao-2" className={styles.select} value={medicaoId2} onChange={(event) => setMedicaoId2(event.target.value)} disabled={medicoes.length < 2}><option value="">Selecione a medição</option>{medicoes.map((medicao) => <option key={medicao.id} value={medicao.id}>#{medicao.id} • {medicao.data || medicao.created_at || 'Sem data'} • {medicao.sulco ?? medicao.tread ?? '—'} mm</option>)}</select></div>
                <p className={styles.secondaryText}>Escolha duas medições do mesmo pneu para comparar o desgaste.</p>
            </section>

            <section className={styles.metrics}>
                <div className={styles.metric}><span className={styles.metricLabel}>Pneu analisado</span><strong className={styles.metricValue}>{selectedTire?.codigoFogo || selectedTire?.fogo || '—'}</strong></div>
                <div className={styles.metric}><span className={styles.metricLabel}>Desgaste</span><strong className={styles.metricValue}>{wearValue !== undefined ? `${wearValue} mm` : '—'}</strong></div>
                <div className={styles.metric}><span className={styles.metricLabel}>Desgaste percentual</span><strong className={styles.metricValue}>{percentage !== undefined ? `${percentage}%` : '—'}</strong></div>
                <div className={styles.metric}><span className={styles.metricLabel}>Condição</span><strong className={styles.metricValue}>{condition}</strong></div>
            </section>

            <section className={styles.panel}>
                <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Resultado da análise</h2></div>
                {!resultado ? <div className={styles.empty}>Não há resultado calculado para este pneu.</div> : <div className={styles.tableWrap}><table className={styles.table}><tbody>{Object.entries(resultado).map(([key, value]) => <tr key={key}><th>{key.replaceAll('_', ' ')}</th><td>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</td></tr>)}</tbody></table></div>}
            </section>
        </div>
    );
}

export default DesgasteView;
