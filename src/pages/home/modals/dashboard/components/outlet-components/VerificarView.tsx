import { useState, useEffect } from "react";

type Tire = {
    id: string;
    position: string;
    status: string;
    pressure: string;
    tread: string;
    life: number;
};

type ApiRecord = Record<string, unknown>;
type MeasurementPayload = {
    viagem_id: number | null;
    profundidade_atual_mm: number;
    data_medicao: string;
};
type MaintenancePayload = {
    caminhao_id: number;
    tipo: string;
    km_realizacao: number;
    custo: number;
    observacoes: string;
};

type TireHistory = {
    mileage: number;
    tread: number;
};

const tires: Tire[] = [
    {
        id: "DE",
        position: "Dianteiro esquerdo",
        status: "Bom",
        pressure: "102 PSI",
        tread: "13,2 mm",
        life: 78,
    },
    {
        id: "DD",
        position: "Dianteiro direito",
        status: "Bom",
        pressure: "101 PSI",
        tread: "13,5 mm",
        life: 82,
    },
    {
        id: "TE",
        position: "Traseiro esquerdo",
        status: "Bom",
        pressure: "106 PSI",
        tread: "15,1 mm",
        life: 91,
    },
    {
        id: "TD",
        position: "Traseiro direito",
        status: "Atenção",
        pressure: "99 PSI",
        tread: "11,8 mm",
        life: 64,
    },
];

const getApiList = (data: unknown): ApiRecord[] => {
    if (Array.isArray(data))
        return data.filter(
            (item): item is ApiRecord =>
                typeof item === "object" && item !== null,
        );
    if (typeof data !== "object" || data === null) return [];
    const record = data as ApiRecord;
    for (const key of [
        "data",
        "items",
        "results",
        "pneus",
        "medicoes",
        "manutencoes",
    ]) {
        if (Array.isArray(record[key])) return getApiList(record[key]);
    }
    return [record];
};

const getNumber = (record: ApiRecord, keys: string[], fallback: number) => {
    for (const key of keys) {
        const value = Number(record[key]);
        if (Number.isFinite(value)) return value;
    }
    return fallback;
};

const getText = (record: ApiRecord, keys: string[], fallback: string) => {
    for (const key of keys) {
        if (
            record[key] !== undefined &&
            record[key] !== null &&
            String(record[key]).trim()
        )
            return String(record[key]);
    }
    return fallback;
};

const getIdentifier = (
    record: ApiRecord,
    keys: string[],
    fallback: string | number = "",
): string | number => {
    for (const key of keys) {
        const value = record[key];
        if (typeof value === "number" && Number.isFinite(value)) return value;
        if (typeof value === "string" && value.trim()) return value.trim();
    }
    return fallback;
};

const normalizeSearchText = (value: unknown) =>
    String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();

const tireAliases: Record<string, string[]> = {
    DE: [
        "de",
        "dianteiro esquerdo",
        "dianteira esquerda",
        "front left",
        "front-left",
    ],
    DD: [
        "dd",
        "dianteiro direito",
        "dianteira direita",
        "front right",
        "front-right",
    ],
    TE: [
        "te",
        "traseiro esquerdo",
        "traseira esquerda",
        "rear left",
        "rear-left",
    ],
    TD: [
        "td",
        "traseiro direito",
        "traseira direita",
        "rear right",
        "rear-right",
    ],
};

const matchesTireRecord = (record: ApiRecord, tire: Tire) => {
    const recordValues = [
        record.id,
        record.codigo,
        record.numero_serie,
        record.pneuId,
        record.pneu_id,
        record.posicao,
        record.position,
        record.localizacao,
        record.localizacao_pneu,
        record.lado,
        record.eixo,
        record.nome,
        record.descricao,
    ]
        .map(normalizeSearchText)
        .filter(Boolean);
    const aliases = [
        tire.id,
        tire.position,
        ...(tireAliases[tire.id] ?? []),
    ].map(normalizeSearchText);

    return aliases.some((alias) =>
        recordValues.some(
            (value) =>
                value === alias ||
                value.includes(alias) ||
                alias.includes(value),
        ),
    );
};

function VerificarView() {
    const tire = tires[0];

    const plate = "ABC-1234";

    const vehicleData = "123";

    const onTireUpdated = (o: object) => {};

    const onBack = () => {};

    const [vehicle, setVehicle] = useState<unknown>(vehicleData);
    const [tireData, setTireData] = useState<unknown>(null);
    const [measurements, setMeasurements] = useState<unknown[]>([]);
    const [maintenance, setMaintenance] = useState<unknown[]>([]);
    const [measurementForm, setMeasurementForm] = useState({
        pressure: tire.pressure.replace(" PSI", ""),
        tread: tire.tread.replace(" mm", ""),
        mileage: "45200",
    });
    const [maintenanceForm, setMaintenanceForm] = useState({
        description: "",
        date: "",
        mileage: "45200",
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [displayPressure, setDisplayPressure] = useState(tire.pressure);

    useEffect(() => {
        const loadDetails = async () => {
            const requests = await Promise.allSettled([
                fetch("/api/caminhoes").then((response) =>
                    response.ok ? response.json() : null,
                ),
                fetch("/api/pneus").then((response) =>
                    response.ok ? response.json() : null,
                ),
                fetch("/api/medicao-pneus").then((response) =>
                    response.ok ? response.json() : null,
                ),
                fetch("/api/manutencoes").then((response) =>
                    response.ok ? response.json() : null,
                ),
            ]);
            const values = requests.map((result) =>
                result.status === "fulfilled" ? result.value : null,
            );
            if (values[0] !== null) setVehicle(values[0]);
            if (values[1] !== null) setTireData(values[1]);
            if (values[2] !== null) setMeasurements(getApiList(values[2]));
            if (values[3] !== null) setMaintenance(getApiList(values[3]));
        };
        void loadDetails();
    }, [plate]);

    const registeredTires = getApiList(tireData);
    const tireIndex = Math.max(
        0,
        tires.findIndex((item) => item.id === tire.id),
    );
    const matchingTire = registeredTires.find((record) =>
        matchesTireRecord(record, tire),
    ) ??
        registeredTires[tireIndex] ?? { id: tire.id };
    const resolvedTireId = getIdentifier(
        matchingTire,
        ["id", "numero_serie", "pneuId", "pneu_id", "codigo"],
        tire.id,
    );
    const vehicleRecords = getApiList(vehicle);
    const vehicleRecord =
        vehicleRecords.find((record) => {
            const crlv = record.crlv as ApiRecord | undefined;
            return (
                String(crlv?.placa ?? record.placa ?? "").toUpperCase() ===
                plate.trim().toUpperCase()
            );
        }) ??
        vehicleRecords[0] ??
        {};
    const resolvedTruckId = getNumber(vehicleRecord, ["id", "caminhao_id"], 0);
    const history = getApiList({ data: measurements })
        .filter((record) => {
            const identity =
                `${record.pneuId ?? ""} ${record.tireId ?? ""} ${record.pneu_caminhao_id ?? ""} ${record.posicao ?? ""} ${record.position ?? ""}`
                    .trim()
                    .toLowerCase();
            return (
                !identity ||
                identity.includes(tire.id.toLowerCase()) ||
                identity.includes(tire.position.toLowerCase())
            );
        })
        .slice(-6);
    const fallbackTread = Number(
        tire.tread.replace(",", ".").replace(" mm", ""),
    );
    const latestMeasurement = history[history.length - 1];
    const currentTread = getNumber(
        latestMeasurement ?? {},
        ["profundidade_atual_mm", "sulco", "tread", "profundidade"],
        fallbackTread,
    );
    const chartPoints: TireHistory[] = history.length
        ? history.map((record, index) => ({
              mileage: getNumber(
                  record,
                  ["quilometragem", "mileage", "km"],
                  45200 - (history.length - index - 1) * 10000,
              ),
              tread: getNumber(
                  record,
                  ["profundidade_atual_mm", "sulco", "tread", "profundidade"],
                  Math.max(0.8, fallbackTread - index * 0.3),
              ),
          }))
        : [
              { mileage: 10000, tread: 2.4 },
              { mileage: 20000, tread: 2.1 },
              { mileage: 30000, tread: 1.8 },
              { mileage: 40000, tread: 1.5 },
              { mileage: 45200, tread: fallbackTread },
          ];
    const maxTread = Math.max(...chartPoints.map((point) => point.tread), 2.5);
    const chartPath = chartPoints
        .map(
            (point, index) =>
                `${index === 0 ? "M" : "L"}${36 + index * (270 / Math.max(chartPoints.length - 1, 1))},${148 - (point.tread / maxTread) * 105}`,
        )
        .join(" ");

    const refreshMeasurementData = async (
        optimisticMeasurement?: MeasurementPayload,
    ) => {
        const [tireResponse, measurementResponse] = await Promise.all([
            fetch("/api/pneus"),
            fetch("/api/medicao-pneus"),
        ]);
        if (tireResponse.ok) setTireData(await tireResponse.json());
        if (measurementResponse.ok) {
            const latestMeasurements = getApiList(
                await measurementResponse.json(),
            );
            setMeasurements(() => {
                if (!optimisticMeasurement) return latestMeasurements;
                const hasOptimisticValue = latestMeasurements.some(
                    (record) =>
                        getNumber(
                            record,
                            ["profundidade_atual_mm", "sulco", "tread"],
                            -1,
                        ) === optimisticMeasurement.profundidade_atual_mm,
                );
                return hasOptimisticValue
                    ? latestMeasurements
                    : [...latestMeasurements, optimisticMeasurement];
            });
        }
    };

    const updateVehicleMileage = async (mileage: number) => {
        if (!resolvedTruckId) return;

        const currentMileage = getNumber(
            vehicleRecord,
            ["km_atual", "quilometragem", "km", "mileage"],
            0,
        );
        if (mileage <= currentMileage) return;

        const response = await fetch(`/api/caminhoes/${resolvedTruckId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ km_atual: mileage }),
        });

        if (!response.ok) {
            throw new Error(
                `Medição salva, mas não foi possível atualizar a quilometragem (${response.status}).`,
            );
        }

        setVehicle((current: unknown) => {
            if (Array.isArray(current)) {
                return current.map((record) =>
                    Number(record.id) === resolvedTruckId
                        ? { ...record, km_atual: mileage }
                        : record,
                );
            }
            if (current && typeof current === "object") {
                return { ...(current as ApiRecord), km_atual: mileage };
            }
            return { ...vehicleRecord, km_atual: mileage };
        });
    };

    const postJson = async (
        url: string,
        payload: MeasurementPayload | MaintenancePayload,
    ) => {
        setSaving(true);
        setMessage(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!response.ok)
                throw new Error(
                    `Não foi possível salvar (${response.status}).`,
                );
            setMessage("Registro salvo com sucesso.");
            return true;
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Não foi possível salvar o registro.",
            );
            return false;
        } finally {
            setSaving(false);
        }
    };

    const toFiniteNumber = (value: string, fieldName: string) => {
        const normalizedValue = value.trim().replace(/,/g, ".");
        const numberValue = Number(normalizedValue);
        if (!Number.isFinite(numberValue))
            throw new Error(`Informe um valor válido para ${fieldName}.`);
        return numberValue;
    };

    const saveMeasurement = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const pressure = toFiniteNumber(
                measurementForm.pressure,
                "pressão",
            );
            const treadDepth = toFiniteNumber(measurementForm.tread, "sulco");
            const mileage = toFiniteNumber(
                measurementForm.mileage,
                "quilometragem",
            );
            const payload: MeasurementPayload = {
                viagem_id: null,
                profundidade_atual_mm: treadDepth,
                data_medicao: new Date().toISOString(),
            };

            const saved = await postJson("/api/medicao-pneus", payload);
            if (saved) {
                const updatedTire = {
                    ...tire,
                    pressure: `${pressure} PSI`,
                    tread: `${treadDepth.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} mm`,
                };
                setDisplayPressure(updatedTire.pressure);
                onTireUpdated(updatedTire);
                await updateVehicleMileage(mileage);
                try {
                    await refreshMeasurementData(payload);
                } catch {
                    setMeasurements((current) => [...current, payload]);
                }
            }
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Não foi possível preparar a medição.",
            );
        }
    };

    const saveMaintenance = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (!resolvedTireId)
                throw new Error(
                    "Não foi possível identificar este pneu no cadastro.",
                );
            if (!resolvedTruckId)
                throw new Error(
                    "Não foi possível identificar o caminhão pela placa informada.",
                );
            const payload: MaintenancePayload = {
                caminhao_id: resolvedTruckId,
                tipo: "Manutenção de pneu",
                km_realizacao: toFiniteNumber(
                    maintenanceForm.mileage,
                    "quilometragem",
                ),
                custo: 0,
                observacoes: `${tire.position}: ${maintenanceForm.description.trim()}`,
            };
            if (!maintenanceForm.description.trim())
                throw new Error("Informe a descrição da ocorrência.");
            const saved = await postJson("/api/manutencoes", payload);
            if (saved) {
                await updateVehicleMileage(payload.km_realizacao);
                setMaintenance((current) => [
                    ...current,
                    {
                        ...payload,
                        descricao: maintenanceForm.description.trim(),
                        data: maintenanceForm.date,
                    },
                ]);
            }
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Não foi possível preparar a ocorrência.",
            );
        }
    };

    return (
        <main className="details-screen">
            <header className="details-header">
                <button className="back-button" type="button" onClick={onBack}>
                    ← Voltar ao caminhão
                </button>
                <div>
                    <span>CONTROLE DE PNEUS</span>
                    <h1>Detalhes do pneu e veículo</h1>
                </div>
                <strong>{tire.id}</strong>
            </header>
            <div className="details-grid">
                <section className="data-block vehicle-block">
                    <h2>▣ Dados do veículo</h2>
                    <div className="vehicle-data">
                        <span>
                            Placa
                            <strong>
                                {getText(
                                    vehicleRecord,
                                    ["placa", "plate"],
                                    plate,
                                )}
                            </strong>
                        </span>
                        <span>
                            Modelo
                            <strong>
                                {getText(
                                    vehicleRecord,
                                    ["modelo", "model"],
                                    "Cargo 816",
                                )}
                            </strong>
                        </span>
                        <span>
                            KM
                            <strong>
                                {getNumber(
                                    vehicleRecord,
                                    ["quilometragem", "km", "mileage"],
                                    45200,
                                ).toLocaleString("pt-BR")}
                            </strong>
                        </span>
                    </div>
                </section>
                <section className="data-block status-block">
                    <div className="block-heading">
                        <h2>◉ Status geral do pneu</h2>
                        <span
                            className={`status status-${tire.status === "Bom" ? "good" : "warning"}`}
                        >
                            {tire.status}
                        </span>
                    </div>
                    <strong className="position-name">{tire.position}</strong>
                    <div className="status-metrics">
                        <span>
                            Vida útil estimada<strong>{tire.life}%</strong>
                        </span>
                        <span>
                            Pressão atual<strong>{displayPressure}</strong>
                        </span>
                        <span>
                            Sulco atual
                            <strong>
                                {currentTread.toLocaleString("pt-BR", {
                                    maximumFractionDigits: 1,
                                })}{" "}
                                mm
                            </strong>
                        </span>
                    </div>
                </section>
                <section className="data-block chart-block">
                    <div className="block-heading">
                        <h2>☷ Histórico de medições</h2>
                        <span>Evolução do desgaste</span>
                    </div>
                    <svg
                        className="wear-chart"
                        viewBox="0 0 330 180"
                        role="img"
                        aria-label="Gráfico de evolução do desgaste"
                    >
                        <path
                            className="chart-grid"
                            d="M36 43H306M36 78H306M36 113H306M36 148H306M36 43V148M36 148H306"
                        />
                        <path
                            className="chart-area"
                            d={`${chartPath} L306 148 L36 148 Z`}
                        />
                        <path className="chart-line" d={chartPath} />
                        {chartPoints.map((point, index) => (
                            <circle
                                key={`${point.mileage}-${index}`}
                                cx={
                                    36 +
                                    index *
                                        (270 /
                                            Math.max(chartPoints.length - 1, 1))
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
                <section className="data-block maintenance-block">
                    <div className="block-heading">
                        <h2>◷ Histórico de manutenções/reformas</h2>
                        <span>{maintenance.length} registros</span>
                    </div>
                    <div className="maintenance-list">
                        {maintenance.length ? (
                            maintenance.slice(-4).map((record, index) => (
                                <div key={index}>
                                    <strong>
                                        {getText(
                                            record as ApiRecord,
                                            [
                                                "descricao",
                                                "description",
                                                "tipo",
                                            ],
                                            "Reforma registrada",
                                        )}
                                    </strong>
                                    <span>
                                        {getText(
                                            record as ApiRecord,
                                            ["data", "date"],
                                            "Data não informada",
                                        )}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma manutenção registrada para este pneu.</p>
                        )}
                    </div>
                </section>
                <form
                    className="data-block form-block"
                    onSubmit={saveMeasurement}
                >
                    <h2>＋ Nova medição</h2>
                    <div className="form-row">
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
                        className="action-button"
                        disabled={saving}
                        type="submit"
                    >
                        {saving ? "Salvando..." : "Adicionar medição"}
                    </button>
                </form>
                <form
                    className="data-block form-block"
                    onSubmit={saveMaintenance}
                >
                    <h2>◷ Registrar ocorrência</h2>
                    <div className="form-row">
                        <label>
                            Data
                            <input
                                type="date"
                                value={maintenanceForm.date}
                                onChange={(event) =>
                                    setMaintenanceForm({
                                        ...maintenanceForm,
                                        date: event.target.value,
                                    })
                                }
                                required
                            />
                        </label>
                        <label>
                            KM
                            <input
                                type="number"
                                value={maintenanceForm.mileage}
                                onChange={(event) =>
                                    setMaintenanceForm({
                                        ...maintenanceForm,
                                        mileage: event.target.value,
                                    })
                                }
                                required
                            />
                        </label>
                    </div>
                    <label>
                        Descrição
                        <textarea
                            value={maintenanceForm.description}
                            onChange={(event) =>
                                setMaintenanceForm({
                                    ...maintenanceForm,
                                    description: event.target.value,
                                })
                            }
                            placeholder="Ex.: recapagem, troca ou inspeção"
                            required
                        />
                    </label>
                    <button
                        className="action-button"
                        disabled={saving}
                        type="submit"
                    >
                        {saving ? "Salvando..." : "Salvar ocorrência"}
                    </button>
                </form>
            </div>
            {message && <p className="save-message">{message}</p>}
        </main>
    );
}

export default VerificarView;
