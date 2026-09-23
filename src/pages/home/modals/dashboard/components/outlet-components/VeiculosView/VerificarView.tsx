import { type Dispatch, type FormEvent, type SetStateAction, useEffect, useState } from 'react';
import { api } from '../../../../../../../service/api';
import styles from '../../../css/Verificar.module.css';

interface VehicleRecord {
  placa: string;
  modelo: string;
  quilometragem: number;
}

interface Tire {
  id: string;
  status: string;
  position: string;
  life: number;
  pressure: number;
  tread: number;
}

interface ChartPoint {
  mileage: number;
  tread: number;
}

interface MaintenanceRecord {
  descricao: string;
  data: string;
}

interface MeasurementForm {
  pressure: string;
  tread: string;
  mileage: string;
}

function numberFrom(data: Record<string, unknown>, keys: string[], fallback: number): number {
  for (const key of keys) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== '') return Number(data[key]);
  }
  return fallback;
}

function statusFrom(life: number, tread: number): string {
  if (life <= 25 || tread < 3) return 'Crítico';
  if (life <= 50 || tread < 5) return 'Atenção';
  return 'Bom';
}

// ============================================================================
// DADOS MOCKADOS
// ============================================================================
const mockVehicleRecord: VehicleRecord = {
  placa: "ABC-1234",
  modelo: "Cargo 816",
  quilometragem: 45200,
};

const mockTire: Tire = {
  id: "PN-99201",
  status: "Bom",
  position: "Dianteiro Esquerdo",
  life: 82,
  pressure: 110,
  tread: 4.2,
};

const mockChartPoints: ChartPoint[] = [
  { mileage: 10000, tread: 8.5 },
  { mileage: 20000, tread: 7.2 },
  { mileage: 30000, tread: 5.8 },
  { mileage: 45200, tread: 4.2 },
];

const mockMaintenance: MaintenanceRecord[] = [
  { descricao: "Reforma / Recapagem", data: "15/02/2024" },
  { descricao: "Rodízio de Pneus", data: "10/08/2023" },
  { descricao: "Alinhamento e Balanceamento", data: "01/05/2023" },
];

// ============================================================================
// COMPONENTES DA TELA
// ============================================================================

function DetailsHeader({ tire }: { tire: Tire }) {
  return (
    <header className={styles['details-header']}>
      <div>
        <span>CONTROLE DE PNEUS</span>
        <h1>Detalhes do pneu e veículo</h1>
      </div>
      <strong>{tire.id}</strong>
    </header>
  );
}

// 1. Cartão de Dados do Veículo
function VehicleCard({ vehicle }: { vehicle: VehicleRecord }) {
  return (
    <section className={`${styles['data-block']} ${styles['vehicle-block']}`}>
      <h2>▣ Dados do veículo</h2>
      <div className={styles['vehicle-data']}>
        <span>
          Placa
          <strong>{vehicle.placa}</strong>
        </span>
        <span>
          Modelo
          <strong>{vehicle.modelo}</strong>
        </span>
        <span>
          KM
          <strong>{vehicle.quilometragem.toLocaleString('pt-BR')}</strong>
        </span>
      </div>
    </section>
  );
}

// 2. Cartão de Status do Pneu
function StatusCard({ tire }: { tire: Tire }) {
  return (
    <section className={`${styles['data-block']} ${styles['status-block']}`}>
      <div className={styles['block-heading']}>
        <h2>◉ Status geral do pneu</h2>
        <span
          className={`${styles['status']} ${
            tire.status === 'Bom' ? styles['status-good'] : styles['status-warning']
          }`}
        >
          {tire.status}
        </span>
      </div>
      <strong className={styles['position-name']}>{tire.position}</strong>
      <div className={styles['status-metrics']}>
        <span>
          Vida útil estimada<strong>{tire.life}%</strong>
        </span>
        <span>
          Pressão atual<strong>{tire.pressure} PSI</strong>
        </span>
        <span>
          Sulco atual
          <strong>
            {tire.tread.toLocaleString('pt-BR', {
              maximumFractionDigits: 1,
            })}{' '}
            mm
          </strong>
        </span>
      </div>
    </section>
  );
}

// 3. Cartão de Histórico de Medições (Gráfico)
function ChartCard({ chartPath, chartPoints, maxTread }: { chartPath: string; chartPoints: ChartPoint[]; maxTread: number }) {
  return (
    <section className={`${styles['data-block']} ${styles['chart-block']}`}>
      <div className={styles['block-heading']}>
        <h2>☷ Histórico de medições</h2>
        <span>Evolução do desgaste</span>
      </div>
      <svg
        className={styles['wear-chart']}
        viewBox="0 0 330 180"
        role="img"
        aria-label="Gráfico de evolução do desgaste"
      >
        <path
          className={styles['chart-grid']}
          d="M36 43H306M36 78H306M36 113H306M36 148H306M36 43V148M36 148H306"
        />
        <path
          className={styles['chart-area']}
          d={`${chartPath} L306 148 L36 148 Z`}
        />
        <path className={styles['chart-line']} d={chartPath} />
        {chartPoints.map((point: ChartPoint, index: number) => (
          <circle
            key={`${point.mileage}-${index}`}
            cx={36 + index * (270 / Math.max(chartPoints.length - 1, 1))}
            cy={148 - (point.tread / maxTread) * 105}
            r="3"
          />
        ))}
        <text x="4" y="47">
          2,5
        </text>
        <text x="4" y="151">
          0
        </text>
        <text x="130" y="173">
          KM rodados
        </text>
      </svg>
    </section>
  );
}

// 4. Cartão de Histórico de Manutenções
function MaintenanceCard({ maintenance }: { maintenance: MaintenanceRecord[] }) {
  return (
    <section className={`${styles['data-block']} ${styles['maintenance-block']}`}>
      <div className={styles['block-heading']}>
        <h2>◷ Histórico de manutenções/reformas</h2>
        <span>{maintenance.length} registros</span>
      </div>
      <div className={styles['maintenance-list']}>
        {maintenance.length ? (
          maintenance.slice(-4).map((record: MaintenanceRecord, index: number) => (
            <div key={`${record.descricao}-${index}`}>
              <strong>{record.descricao}</strong>
              <span>{record.data}</span>
            </div>
          ))
        ) : (
          <p>Nenhuma manutenção registrada para este pneu.</p>
        )}
      </div>
    </section>
  );
}

// 5. Cartão de Formulário de Nova Medição
function NewMeasurementForm({
  saveMeasurement,
  measurementForm,
  setMeasurementForm,
  saving,
}: {
  saveMeasurement: (e: FormEvent<HTMLFormElement>) => void;
  measurementForm: MeasurementForm;
  setMeasurementForm: Dispatch<SetStateAction<MeasurementForm>>;
  saving: boolean;
}) {
  return (
    <form
      className={`${styles['data-block']} ${styles['form-block']}`}
      onSubmit={saveMeasurement}
    >
      <h2>＋ Nova medição</h2>
      <div className={styles['form-row']}>
        <label>
          Pressão (PSI)
          <input
            type="number"
            value={measurementForm.pressure}
            onChange={(event) =>
              setMeasurementForm((prev) => ({
                ...prev,
                pressure: event.target.value,
              }))
            }
            required
          />
        </label>
        <label>
          Sulco (mm)
          <input
            type="number"
            step="0.1"
            value={measurementForm.tread}
            onChange={(event) =>
              setMeasurementForm((prev) => ({
                ...prev,
                tread: event.target.value,
              }))
            }
            required
          />
        </label>
        <label>
          KM
          <input
            type="number"
            value={measurementForm.mileage}
            onChange={(event) =>
              setMeasurementForm((prev) => ({
                ...prev,
                mileage: event.target.value,
              }))
            }
            required
          />
        </label>
      </div>
      <button
        className={styles['action-button']}
        disabled={saving}
        type="submit"
      >
        {saving ? 'Salvando...' : 'Adicionar medição'}
      </button>
    </form>
  );
}

// ============================================================================
// CONTEÚDO
// ============================================================================

function Content({
  vehicleRecord,
  tire,
  maintenance,
  chartPoints,
  chartPath,
  maxTread,
  measurementForm,
  setMeasurementForm,
  saving,
  message,
  saveMeasurement,
}: {
  vehicleRecord: VehicleRecord;
  tire: Tire;
  maintenance: MaintenanceRecord[];
  chartPoints: ChartPoint[];
  chartPath: string;
  maxTread: number;
  measurementForm: MeasurementForm;
  setMeasurementForm: Dispatch<SetStateAction<MeasurementForm>>;
  saving: boolean;
  message: string;
  saveMeasurement: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className={styles['content']}>
      <DetailsHeader tire={tire} />

      <div className={styles['details-grid']}>
        <VehicleCard vehicle={vehicleRecord} />

        <StatusCard tire={tire} />

        <ChartCard
          chartPath={chartPath}
          chartPoints={chartPoints}
          maxTread={maxTread}
        />

        <MaintenanceCard maintenance={maintenance} />
      </div>

      <NewMeasurementForm
        saveMeasurement={saveMeasurement}
        measurementForm={measurementForm}
        setMeasurementForm={setMeasurementForm}
        saving={saving}
      />

      {message && <p className={styles['save-message']}>{message}</p>}
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL (VIEW)
// ============================================================================

function VerificarView({ selectedTireId, selectedTirePosition, selectedVehiclePlate }: { selectedTireId?: string; selectedTirePosition?: string; selectedVehiclePlate?: string }) {
  const [vehicleRecord, setVehicleRecord] = useState<VehicleRecord>(mockVehicleRecord);
  const [tire, setTire] = useState<Tire>({ ...mockTire, id: selectedTireId || mockTire.id, position: selectedTirePosition || mockTire.position });
  const [maintenance] = useState<MaintenanceRecord[]>(mockMaintenance);
  const [chartPoints, setChartPoints] = useState<ChartPoint[]>(mockChartPoints);

  const [measurementForm, setMeasurementForm] = useState<MeasurementForm>({
    pressure: '',
    tread: '',
    mileage: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!selectedTireId) return;

    const loadTireDetails = async () => {
      try {
        const requests = [
          api.get(`pneus/${encodeURIComponent(selectedTireId)}`),
          api.get(`pneus/${encodeURIComponent(selectedTireId)}/medicoes`),
        ];
        if (selectedVehiclePlate) requests.push(api.get(`veiculos/${encodeURIComponent(selectedVehiclePlate)}`));
        const responses = await Promise.all(requests);
        const tireResponse = responses[0];
        const measurementsResponse = responses[1];
        const tireData = tireResponse && typeof tireResponse === 'object' && 'data' in tireResponse ? tireResponse.data : tireResponse;
        if (tireData && typeof tireData === 'object') {
          const data = tireData as Record<string, unknown>;
          setTire((current) => ({
            ...current,
            id: String(data.id || selectedTireId),
            status: String(data.status || data.condicao || data.classificacao || statusFrom(numberFrom(data, ['life', 'vida_util', 'vida_util_percentual'], current.life), numberFrom(data, ['tread', 'sulco', 'sulco_atual'], current.tread))),
            position: selectedTirePosition || String(data.position || data.posicao || current.position),
            pressure: numberFrom(data, ['pressure', 'pressao', 'pressao_atual'], current.pressure),
            tread: numberFrom(data, ['tread', 'sulco', 'sulco_atual'], current.tread),
            life: numberFrom(data, ['life', 'vida_util', 'vida_util_percentual'], current.life),
          }));
        }
        const measurementData = measurementsResponse && typeof measurementsResponse === 'object' && 'data' in measurementsResponse ? measurementsResponse.data : measurementsResponse;
        const measurements = Array.isArray(measurementData) ? measurementData : measurementData && typeof measurementData === 'object' && 'medicoes' in measurementData && Array.isArray(measurementData.medicoes) ? measurementData.medicoes : [];
        if (measurements.length > 0) {
          const latest = measurements[measurements.length - 1] as Record<string, unknown>;
          const latestTread = numberFrom(latest, ['tread', 'sulco', 'sulco_atual'], tire.tread);
          const latestPressure = numberFrom(latest, ['pressure', 'pressao', 'pressao_atual'], tire.pressure);
          setTire((current) => ({ ...current, tread: latestTread, pressure: latestPressure, status: statusFrom(current.life, latestTread) }));
          setChartPoints(measurements.map((measurement: unknown) => {
            const item = measurement as Record<string, unknown>;
            return { mileage: numberFrom(item, ['mileage', 'km', 'quilometragem'], 0), tread: numberFrom(item, ['tread', 'sulco', 'sulco_atual'], 0) };
          }));
        }
        if (selectedVehiclePlate && responses[2]) {
          const vehicleResponse = responses[2];
          const vehicleData = vehicleResponse && typeof vehicleResponse === 'object' && 'data' in vehicleResponse ? vehicleResponse.data : vehicleResponse;
          if (vehicleData && typeof vehicleData === 'object') {
            const data = vehicleData as Record<string, unknown>;
            setVehicleRecord({
              placa: String(data.placa || selectedVehiclePlate),
              modelo: String(data.modelo || data.tipo || mockVehicleRecord.modelo),
              quilometragem: Number(data.km || data.quilometragem || mockVehicleRecord.quilometragem),
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do pneu:', error);
        setMessage('Não foi possível carregar todos os dados do pneu.');
      }
    };

    loadTireDetails();
  }, [selectedTireId, selectedTirePosition, selectedVehiclePlate]);

  const maxTread = 10;
  const chartPath = 'M36 60 L126 80 L216 100 L306 120';

  const saveMeasurement = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post(`pneus/${encodeURIComponent(tire.id)}/medicoes`, {
        pressao: measurementForm.pressure,
        sulco: measurementForm.tread,
        km: measurementForm.mileage,
      });
      setSaving(false);
      setMessage('Medição adicionada com sucesso!');
      setMeasurementForm({ pressure: '', tread: '', mileage: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao salvar medição:', error);
      setMessage(error instanceof Error ? error.message : 'Não foi possível salvar a medição.');
      setSaving(false);
    }
  };

  return (
    <div className={styles['container']}>
      <Content
        vehicleRecord={vehicleRecord}
        tire={tire}
        maintenance={maintenance}
        chartPoints={chartPoints}
        chartPath={chartPath}
        maxTread={maxTread}
        measurementForm={measurementForm}
        setMeasurementForm={setMeasurementForm}
        saving={saving}
        message={message}
        saveMeasurement={saveMeasurement}
      />
    </div>
  )
}

export default VerificarView
