import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../../../../../../service/api';
import styles from '../../css/VehicleTires.module.css';

interface Vehicle {
  id: number | string;
  placa?: string;
  marca?: string;
  modelo?: string;
  crlv?: { placa?: string; marca?: string; tipo?: string };
}

interface Tire {
  id: number | string;
  fogo?: string;
  codigoFogo?: string;
  marca?: string;
  medida?: string;
}

interface Allocation {
  id?: number | string;
  veiculo_id?: number | string;
  pneu_id?: number | string;
  veiculo?: Vehicle | number | string;
  pneu?: Tire | number | string;
  eixo: number;
  lado: string;
  indice: number;
}

interface VehicleTiresProps {
  onRegisterVehicle: () => void;
  initialPlate?: string;
  initialPosition?: string;
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

function vehiclePlate(vehicle: Vehicle): string {
  return vehicle.placa || vehicle.crlv?.placa || 'Placa não informada';
}

function tireLabel(tire: Tire): string {
  return tire.codigoFogo || tire.fogo || `Pneu ${tire.id}`;
}

export default function VehicleTiresManagement({ onRegisterVehicle, initialPlate, initialPosition }: VehicleTiresProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [tires, setTires] = useState<Tire[]>([]);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [tireId, setTireId] = useState('');
  const [eixo, setEixo] = useState('0');
  const [lado, setLado] = useState('E');
  const [indice, setIndice] = useState('0');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [vehiclesResponse, tiresResponse] = await Promise.all([
        api.get('veiculos'),
        api.get('pneus'),
      ]);
      const loadedVehicles = normalizeList<Vehicle>(vehiclesResponse, ['items', 'results', 'veiculos']);
      setVehicles(loadedVehicles);
      setTires(normalizeList<Tire>(tiresResponse, ['items', 'results', 'pneus']));
      setAllocations([]);
      if (!selectedVehicle && loadedVehicles.length > 0) {
        setSelectedVehicle(loadedVehicles.find((vehicle) => vehiclePlate(vehicle) === initialPlate) || loadedVehicles[0]);
      }
      const positionMatch = initialPosition?.match(/Eixo (\d+) • lado ([ED]) • índice (\d+)/);
      if (positionMatch) {
        setEixo(positionMatch[1]);
        setLado(positionMatch[2]);
        setIndice(positionMatch[3]);
      }
    } catch (requestError) {
      console.error('Erro ao carregar alocações:', requestError);
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os dados de alocação.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedVehicle) return;

    const loadAllocations = async () => {
      try {
        const response = await api.get(`veiculos/${encodeURIComponent(vehiclePlate(selectedVehicle))}/alocacoes`);
        setAllocations(normalizeList<Allocation>(response, ['items', 'results', 'alocacoes']));
      } catch (requestError) {
        console.error('Erro ao carregar alocações do veículo:', requestError);
        setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os pneus do veículo.');
      }
    };

    loadAllocations();
  }, [selectedVehicle]);

  const vehicleAllocations = allocations;
  const availableTires = tires.filter((tire) => !allocations.some((allocation) => String(allocation.pneu_id || allocation.pneu) === String(tire.id)));
  const visibleVehicles = vehicles.filter((vehicle) => `${vehiclePlate(vehicle)} ${vehicle.marca || ''} ${vehicle.modelo || ''}`.toLowerCase().includes(vehicleSearch.toLowerCase()));

  const allocationRoute = selectedVehicle
    ? `veiculos/${encodeURIComponent(vehiclePlate(selectedVehicle))}/alocacoes`
    : '';

  const toAllocationPayload = (allocation: Allocation) => ({
    veiculo: Number(selectedVehicle?.id),
    pneu: Number(allocation.pneu_id || (allocation.pneu && typeof allocation.pneu === 'object' ? allocation.pneu.id : allocation.pneu)),
    eixo: Number(allocation.eixo),
    lado: allocation.lado,
    indice: Number(allocation.indice),
  });

  const saveAllocationList = async (nextAllocations: Allocation[]) => {
    if (!selectedVehicle || !allocationRoute) return;
    const payload = nextAllocations.map(toAllocationPayload);
    if (payload.some((allocation) => !Number.isInteger(allocation.indice) || allocation.indice < 0)) {
      throw new Error('O índice deve ser um número inteiro maior ou igual a zero.');
    }
    await api.post(allocationRoute, payload);
    setAllocations(nextAllocations);
  };

  const createAllocation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedVehicle || !tireId) return;
    if (!Number.isInteger(Number(indice)) || Number(indice) < 0) {
      setError('O índice deve ser um número inteiro maior ou igual a zero.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const created: Allocation = {
        id: Date.now(),
        veiculo_id: selectedVehicle.id,
        pneu_id: tireId,
        eixo: Number(eixo),
        lado,
        indice: Number(indice),
      };
      await saveAllocationList([...allocations, created]);
      setTireId('');
      setEixo('0');
      setLado('E');
      setIndice('0');
    } catch (requestError) {
      console.error('Erro ao criar alocação:', requestError);
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível alocar o pneu.');
    } finally {
      setSaving(false);
    }
  };

  const removeAllocation = async (allocation: Allocation, allocationIndex: number) => {
    try {
      setError('');
      const nextAllocations = allocations.filter((item, itemIndex) => item.id !== allocation.id || itemIndex !== allocationIndex);
      await saveAllocationList(nextAllocations);
    } catch (requestError) {
      console.error('Erro ao remover alocação:', requestError);
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível remover a alocação.');
    }
  };

  const getTireFromAllocation = (allocation: Allocation) => {
    if (allocation.pneu && typeof allocation.pneu === 'object') return allocation.pneu;
    return tires.find((tire) => String(tire.id) === String(allocation.pneu_id || allocation.pneu));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div><span className={styles.eyebrow}>Gestão de veículos</span><h1 className={styles.title}>Pneus dos veículos</h1><p className={styles.subtitle}>Gerencie as alocações de pneus por veículo e posição.</p></div>
        <button type="button" className={styles.primaryButton} onClick={onRegisterVehicle}>+ Registrar veículo</button>
      </header>

      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.layout}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Veículos</h2></div>
          <input className={styles.search} value={vehicleSearch} onChange={(event) => setVehicleSearch(event.target.value)} placeholder="Buscar placa ou veículo" />
          {loading ? <div className={styles.empty}>Carregando veículos...</div> : visibleVehicles.length === 0 ? <div className={styles.empty}>Nenhum veículo encontrado.</div> : <div className={styles.vehicleList}>{visibleVehicles.map((vehicle) => <button type="button" key={vehicle.id} className={`${styles.vehicleButton} ${selectedVehicle?.id === vehicle.id ? styles.vehicleSelected : ''}`} onClick={() => setSelectedVehicle(vehicle)}><span className={styles.vehicleName}>{vehiclePlate(vehicle)}</span><span className={styles.vehicleMeta}>{vehicle.marca || 'Marca não informada'} {vehicle.modelo || ''}</span></button>)}</div>}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}><h2 className={styles.panelTitle}>{selectedVehicle ? `Pneus de ${vehiclePlate(selectedVehicle)}` : 'Selecione um veículo'}</h2><button type="button" className={styles.secondaryButton} onClick={loadData}>Atualizar</button></div>
          <div className={styles.stats}><div className={styles.stat}><span className={styles.statLabel}>Alocados</span><strong className={styles.statValue}>{vehicleAllocations.length}</strong></div><div className={styles.stat}><span className={styles.statLabel}>Disponíveis</span><strong className={styles.statValue}>{availableTires.length}</strong></div><div className={styles.stat}><span className={styles.statLabel}>Posições</span><strong className={styles.statValue}>{vehicleAllocations.filter((allocation) => allocation.lado && allocation.indice !== undefined).length}</strong></div></div>

          <form className={styles.form} onSubmit={createAllocation}>
            <div className={styles.formGroup}><label htmlFor="pneu-alocacao">Pneu</label><select id="pneu-alocacao" className={styles.select} value={tireId} onChange={(event) => setTireId(event.target.value)} required disabled={!selectedVehicle}><option value="">Selecione um pneu</option>{availableTires.map((tire) => <option key={tire.id} value={tire.id}>{tireLabel(tire)} {tire.marca ? `• ${tire.marca}` : ''}</option>)}</select></div>
            <div className={styles.formGroup}><label htmlFor="eixo-alocacao">Eixo</label><input id="eixo-alocacao" className={styles.search} type="number" min="0" value={eixo} onChange={(event) => setEixo(event.target.value)} required /></div>
            <div className={styles.formGroup}><label htmlFor="lado-alocacao">Lado</label><select id="lado-alocacao" className={styles.select} value={lado} onChange={(event) => setLado(event.target.value)}><option value="E">Esquerdo</option><option value="D">Direito</option></select></div>
            <div className={styles.formGroup}><label htmlFor="indice-alocacao">Índice</label><input id="indice-alocacao" className={styles.search} type="number" min="0" step="1" value={indice} onChange={(event) => setIndice(event.target.value)} required /></div>
            <button type="submit" className={styles.primaryButton} disabled={saving || !selectedVehicle}>{saving ? 'Salvando...' : 'Alocar pneu'}</button>
          </form>

          {vehicleAllocations.length === 0 ? <div className={styles.empty}>Este veículo ainda não possui pneus alocados.</div> : <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Pneu</th><th>Marca / medida</th><th>Eixo</th><th>Lado</th><th>Índice</th><th>Ação</th></tr></thead><tbody>{vehicleAllocations.map((allocation, allocationIndex) => { const tire = getTireFromAllocation(allocation); return <tr key={allocation.id || `${allocation.eixo}-${allocation.lado}-${allocation.indice}-${allocationIndex}`}><td><span className={styles.primaryText}>{tire && typeof tire === 'object' ? tireLabel(tire) : `Pneu ${allocation.pneu_id || allocation.pneu}`}</span></td><td>{tire && typeof tire === 'object' ? `${tire.marca || 'Marca não informada'} ${tire.medida || ''}` : 'Dados não carregados'}</td><td>{allocation.eixo}</td><td>{allocation.lado}</td><td>{allocation.indice}</td><td><button type="button" className={styles.removeButton} onClick={() => removeAllocation(allocation, allocationIndex)}>Remover</button></td></tr>; })}</tbody></table></div>}
        </section>
      </div>
    </div>
  );
}
