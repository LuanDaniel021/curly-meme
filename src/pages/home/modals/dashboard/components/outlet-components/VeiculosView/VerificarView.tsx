import { useState } from 'react'
import styles from '../../../css/InspecoesView.module.css'

// ============================================================================
// DADOS MOCKADOS
// ============================================================================
const mockVehicleRecord = {
  placa: "ABC-1234",
  modelo: "Cargo 816",
  quilometragem: 45200
}

const mockTire = {
  id: "PN-99201",
  status: "Bom",
  position: "Dianteiro Esquerdo",
  life: 82,
  pressure: 110,
  tread: 4.2
}

const mockChartPoints = [
  { mileage: 10000, tread: 8.5 },
  { mileage: 20000, tread: 7.2 },
  { mileage: 30000, tread: 5.8 },
  { mileage: 45200, tread: 4.2 }
]

const mockMaintenance = [
  { descricao: "Reforma / Recapagem", data: "15/02/2024" },
  { descricao: "Rodízio de Pneus", data: "10/08/2023" },
  { descricao: "Alinhamento e Balanceamento", data: "01/05/2023" }
]

// ============================================================================
// COMPONENTES DA TELA
// ============================================================================

function DetailsHeader({ tire }) {
  return (
    <header className={styles['details-header']}>
      <div>
        <span>CONTROLE DE PNEUS</span>
        <h1>Detalhes do pneu e veículo</h1>
      </div>
      <strong>{tire.id}</strong>
    </header>
  )
}

// 1. Cartão de Dados do Veículo
function VehicleCard({ vehicle }) {
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
          <strong>{vehicle.quilometragem.toLocaleString("pt-BR")}</strong>
        </span>
      </div>
    </section>
  )
}

// 2. Cartão de Status do Pneu
function StatusCard({ tire }) {
  return (
    <section className={`${styles['data-block']} ${styles['status-block']}`}>
      <div className={styles['block-heading']}>
        <h2>◉ Status geral do pneu</h2>
        <span
          className={`${styles['status']} ${
            tire.status === "Bom" ? styles['status-good'] : styles['status-warning']
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
            {tire.tread.toLocaleString("pt-BR", {
              maximumFractionDigits: 1,
            })}{" "}
            mm
          </strong>
        </span>
      </div>
    </section>
  )
}

// 3. Cartão de Histórico de Medições (Gráfico)
function ChartCard({ chartPath, chartPoints, maxTread }) {
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
        {chartPoints.map((point, index) => (
          <circle
            key={`${point.mileage}-${index}`}
            cx={
              36 +
              index *
                (270 / Math.max(chartPoints.length - 1, 1))
            }
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
  )
}

// 4. Cartão de Histórico de Manutenções
function MaintenanceCard({ maintenance }) {
  return (
    <section className={`${styles['data-block']} ${styles['maintenance-block']}`}>
      <div className={styles['block-heading']}>
        <h2>◷ Histórico de manutenções/reformas</h2>
        <span>{maintenance.length} registros</span>
      </div>
      <div className={styles['maintenance-list']}>
        {maintenance.length ? (
          maintenance.slice(-4).map((record, index) => (
            <div key={index}>
              <strong>{record.descricao}</strong>
              <span>{record.data}</span>
            </div>
          ))
        ) : (
          <p>Nenhuma manutenção registrada para este pneu.</p>
        )}
      </div>
    </section>
  )
}

// 5. Cartão de Formulário de Nova Medição
function NewMeasurementForm({ saveMeasurement, measurementForm, setMeasurementForm, saving }) {
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
              setMeasurementForm({
                ...measurementForm,
                pressure: event.target.value,
              })
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
              setMeasurementForm({
                ...measurementForm,
                tread: event.target.value,
              })
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
              setMeasurementForm({
                ...measurementForm,
                mileage: event.target.value,
              })
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
        {saving ? "Salvando..." : "Adicionar medição"}
      </button>
    </form>
  )
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
  saveMeasurement
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
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL (VIEW)
// ============================================================================

function VerificarView() {
  const [vehicleRecord] = useState(mockVehicleRecord)
  const [tire] = useState(mockTire)
  const [maintenance] = useState(mockMaintenance)
  const [chartPoints] = useState(mockChartPoints)

  const [measurementForm, setMeasurementForm] = useState({
    pressure: '',
    tread: '',
    mileage: ''
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const maxTread = 10
  const chartPath = "M36 60 L126 80 L216 100 L306 120"

  const saveMeasurement = (e) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setMessage("Medição adicionada com sucesso!")
      setMeasurementForm({ pressure: '', tread: '', mileage: '' })
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

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
