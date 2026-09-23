
import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../../../../../../service/api';
import styles from '../../css/Manutencoes.module.css';

type MaintenanceMode = 'preventiva' | 'corretiva' | 'agendamentos';

interface MaintenanceItem {
    id: number | string;
    titulo?: string;
    descricao?: string;
    veiculo?: string;
    tipo?: string;
    status?: string;
    data?: string;
}

interface ManutencoesProps {
    initialMode?: MaintenanceMode;
}

interface MaintenanceForm {
    veiculo: string;
    tipo: MaintenanceMode;
    data: string;
    descricao: string;
}

const formularioInicial: MaintenanceForm = { veiculo: '', tipo: 'preventiva', data: '', descricao: '' };
const abas: { id: MaintenanceMode; label: string }[] = [
    { id: 'preventiva', label: 'Preventivas' },
    { id: 'corretiva', label: 'Corretivas' },
    { id: 'agendamentos', label: 'Agendamentos' },
];

function normalizarLista(response: unknown): MaintenanceItem[] {
    if (Array.isArray(response)) return response as MaintenanceItem[];
    if (!response || typeof response !== 'object') return [];
    const dados = 'data' in response ? response.data : response;
    if (Array.isArray(dados)) return dados as MaintenanceItem[];
    if (dados && typeof dados === 'object') {
        const objeto = dados as Record<string, unknown>;
        for (const chave of ['items', 'results', 'rows', 'manutencoes']) {
            if (Array.isArray(objeto[chave])) return objeto[chave] as MaintenanceItem[];
        }
    }
    return [];
}

function ManutencoesView({ initialMode = 'preventiva' }: ManutencoesProps) {
    const [modo, setModo] = useState<MaintenanceMode>(initialMode);
    const [manutencoes, setManutencoes] = useState<MaintenanceItem[]>([]);
    const [formulario, setFormulario] = useState<MaintenanceForm>(formularioInicial);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const carregarManutencoes = async () => {
            try {
                setErro('');
                const response = await api.get('manutencoes');
                setManutencoes(normalizarLista(response));
            } catch (error) {
                console.error('Erro ao carregar manutenções:', error);
                setErro(error instanceof Error ? error.message : 'Não foi possível carregar as manutenções.');
            } finally {
                setCarregando(false);
            }
        };
        carregarManutencoes();
    }, []);

    const manutencoesFiltradas = manutencoes.filter((item) => {
        if (modo === 'agendamentos') return item.status?.toLowerCase() === 'agendado';
        return item.tipo?.toLowerCase() === modo;
    });

    const atualizarCampo = (campo: keyof MaintenanceForm, valor: string) => {
        setFormulario((anterior) => ({ ...anterior, [campo]: valor }));
    };

    const registrarManutencao = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSalvando(true);
        setErro('');
        try {
            const response = await api.post('manutencoes', {
                veiculo: formulario.veiculo.trim(),
                tipo: formulario.tipo,
                data: formulario.data,
                descricao: formulario.descricao.trim(),
                status: 'Pendente',
            });
            const criada = normalizarLista(response)[0];
            if (criada) setManutencoes((anteriores) => [criada, ...anteriores]);
            setFormulario(formularioInicial);
        } catch (error) {
            console.error('Erro ao registrar manutenção:', error);
            setErro(error instanceof Error ? error.message : 'Não foi possível registrar a manutenção.');
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <span className={styles.eyebrow}>Operação da frota</span>
                    <h1 className={styles.title}>Manutenção</h1>
                    <p className={styles.subtitle}>Planeje, registre e acompanhe os serviços da frota.</p>
                </div>
                <button className={styles.primaryButton} type="button" onClick={() => document.getElementById('nova-manutencao')?.focus()}>
                    + Nova manutenção
                </button>
            </header>

            <nav className={styles.tabs} aria-label="Tipos de manutenção">
                {abas.map((aba) => (
                    <button key={aba.id} type="button" className={`${styles.tab} ${modo === aba.id ? styles.tabActive : ''}`} onClick={() => setModo(aba.id)}>
                        {aba.label}
                    </button>
                ))}
            </nav>

            <section className={styles.metrics}>
                <div className={styles.metric}><span className={styles.metricLabel}>Total registrado</span><strong className={styles.metricValue}>{manutencoes.length}</strong></div>
                <div className={styles.metric}><span className={styles.metricLabel}>Pendentes</span><strong className={styles.metricValue}>{manutencoes.filter((item) => item.status?.toLowerCase() === 'pendente').length}</strong></div>
                <div className={styles.metric}><span className={styles.metricLabel}>Agendadas</span><strong className={styles.metricValue}>{manutencoes.filter((item) => item.status?.toLowerCase() === 'agendado').length}</strong></div>
                <div className={styles.metric}><span className={styles.metricLabel}>Concluídas</span><strong className={styles.metricValue}>{manutencoes.filter((item) => ['concluída', 'concluida'].includes(item.status?.toLowerCase() || '')).length}</strong></div>
            </section>

            <div className={styles.content}>
                <section className={styles.panel}>
                    <div className={styles.panelHeader}><h2 className={styles.panelTitle}>{abas.find((aba) => aba.id === modo)?.label}</h2></div>
                    {erro && <div className={styles.error}>{erro}</div>}
                    {carregando ? <div className={styles.empty}>Carregando manutenções...</div> : manutencoesFiltradas.length === 0 ? <div className={styles.empty}>Nenhum registro nesta categoria.</div> : (
                        <div className={styles.list}>
                            {manutencoesFiltradas.map((item) => (
                                <article className={styles.listItem} key={item.id}>
                                    <div><h3 className={styles.itemTitle}>{item.titulo || item.descricao || 'Manutenção sem descrição'}</h3><p className={styles.itemMeta}>{item.veiculo || 'Veículo não informado'} {item.data ? `• ${item.data}` : ''}</p></div>
                                    <span className={styles.badge}>{item.status || 'Pendente'}</span>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section className={styles.panel}>
                    <div className={styles.panelHeader}><h2 className={styles.panelTitle}>Nova manutenção</h2></div>
                    <form className={styles.form} onSubmit={registrarManutencao}>
                        <div className={styles.formGroup}><label htmlFor="nova-manutencao">Veículo</label><input id="nova-manutencao" className={styles.input} value={formulario.veiculo} onChange={(event) => atualizarCampo('veiculo', event.target.value)} placeholder="Placa ou identificação" required /></div>
                        <div className={styles.formGroup}><label htmlFor="tipo-manutencao">Tipo</label><select id="tipo-manutencao" className={styles.select} value={formulario.tipo} onChange={(event) => atualizarCampo('tipo', event.target.value)}><option value="preventiva">Preventiva</option><option value="corretiva">Corretiva</option></select></div>
                        <div className={styles.formGroup}><label htmlFor="data-manutencao">Data</label><input id="data-manutencao" className={styles.input} type="date" value={formulario.data} onChange={(event) => atualizarCampo('data', event.target.value)} required /></div>
                        <div className={styles.formGroup}><label htmlFor="descricao-manutencao">Descrição</label><textarea id="descricao-manutencao" className={styles.textarea} value={formulario.descricao} onChange={(event) => atualizarCampo('descricao', event.target.value)} placeholder="Descreva o serviço necessário" required /></div>
                        <div className={styles.formActions}><button className={styles.secondaryButton} type="button" onClick={() => setFormulario(formularioInicial)}>Limpar</button><button className={styles.primaryButton} type="submit" disabled={salvando}>{salvando ? 'Salvando...' : 'Registrar'}</button></div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ManutencoesView;
