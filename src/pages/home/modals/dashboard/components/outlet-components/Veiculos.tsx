
import plateStyles from '../../css/Veiculos.module.css';
import { useState, type FormEvent } from 'react';
import { api } from '../../../../../../service/api';
import VehicleManagement from './VehicleManagement';
import Modelo3dView from './VeiculosView/Modelo3dView';

interface SelectedVehicle {
  id?: number | string;
  placa?: string;
  marca?: string;
  modelo?: string;
  tipo?: string;
}

interface VehicleAllocation {
  pneu: number | string | { id: number | string };
  eixo: number;
  lado: string;
  indice: number;
}

function normalizeAllocations(response: unknown): VehicleAllocation[] {
  if (Array.isArray(response)) return response as VehicleAllocation[];
  if (!response || typeof response !== 'object') return [];
  const data = 'data' in response ? response.data : response;
  if (Array.isArray(data)) return data as VehicleAllocation[];
  return [];
}

function tireIdFromAllocation(allocation: VehicleAllocation): string {
  return String(typeof allocation.pneu === 'object' ? allocation.pneu.id : allocation.pneu);
}

function PlateHeader({ plate, setPlate, onSubmit, loading, vehicle }: {
  plate: string;
  setPlate: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  vehicle: SelectedVehicle | null;
}) {
  return (
    <section className={plateStyles['header']}>
      <form className={plateStyles['plate-area']} onSubmit={onSubmit}>
        <label className={plateStyles['eyebrow']} htmlFor="vehicle-plate">Selecione o caminhão pela placa</label>
        <div className={plateStyles['plate']}>
          <div className={plateStyles['plate-header']}>
            BR <span>•</span> BRASIL
          </div>
          <input
            type="text"
            id="vehicle-plate"
            value={plate}
            onChange={(event) => setPlate(event.target.value.toUpperCase())}
            placeholder="ABC1D23"
            maxLength={7}
            required
          />
          <span className={plateStyles['plate-country']}>BR</span>
        </div>
        <button className={plateStyles['plate-submit']} type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Carregar caminhão'}
        </button>
        {vehicle && <strong className={plateStyles['vehicle-name']}>{vehicle.marca || ''} {vehicle.modelo || vehicle.tipo || ''}</strong>}
      </form>
    </section>
  );
}

function Veiculos({ onRegister, onDetails }: { onRegister: () => void; onDetails: (plate: string) => void }) {
  return <VehicleManagement onRegister={onRegister} onDetails={onDetails} />;
}

export function Veiculos3dView({ onSelectTire }: { onSelectTire: (tireId: string | undefined, position: string, plate: string) => void }) {
  const [plate, setPlate] = useState('');
  const [vehicle, setVehicle] = useState<SelectedVehicle | null>(null);
  const [allocations, setAllocations] = useState<VehicleAllocation[]>([]);
  const [loading, setLoading] = useState(false);

  const selectVehicle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const normalizedPlate = plate.trim();
      const [vehicleResponse, allocationsResponse] = await Promise.all([
        api.get(`veiculos/${encodeURIComponent(normalizedPlate)}`),
        api.get(`veiculos/${encodeURIComponent(normalizedPlate)}/alocacoes`),
      ]);
      const data = vehicleResponse && typeof vehicleResponse === 'object' && 'data' in vehicleResponse ? vehicleResponse.data : vehicleResponse;
      setVehicle(data as SelectedVehicle);
      setAllocations(normalizeAllocations(allocationsResponse));
    } catch (error) {
      console.error('Erro ao carregar veículo pela placa:', error);
      setVehicle(null);
      alert(error instanceof Error ? error.message : 'Não foi possível carregar o veículo.');
    } finally {
      setLoading(false);
    }
  };

  const selectTireFromModel = (tireId: string | undefined, slot: string) => {
    const match = slot.match(/^E(\d+)(E|D)$/);
    const allocation = allocations.find((item) => item.eixo === Number(match?.[1]) && item.lado === match?.[2] && tireIdFromAllocation(item) === tireId);
    const eixo = allocation?.eixo ?? Number(match?.[1] || 0);
    const lado = allocation?.lado ?? match?.[2] ?? 'E';
    const indice = allocation?.indice ?? 0;
    onSelectTire(tireId, `Eixo ${eixo} • lado ${lado} • índice ${indice}`, plate.trim());
  };

  const tireSlots = allocations.reduce<Record<string, string[]>>((slots, allocation) => {
    const key = `E${allocation.eixo}${allocation.lado}`;
    const tiresAtPosition = slots[key] || [];
    tiresAtPosition[allocation.indice] = tireIdFromAllocation(allocation);
    slots[key] = tiresAtPosition;
    return slots;
  }, {});

  return (
    <div className={plateStyles['container']}>
      <PlateHeader plate={plate} setPlate={setPlate} onSubmit={selectVehicle} loading={loading} vehicle={vehicle} />
      <div className={plateStyles['render']}>
        <Modelo3dView tireSlots={tireSlots} onSelectTire={selectTireFromModel} />
      </div>
    </div>
  );
}

export default Veiculos;
