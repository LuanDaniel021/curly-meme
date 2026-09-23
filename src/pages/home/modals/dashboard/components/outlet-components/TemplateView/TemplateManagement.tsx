import { useEffect, useState, type FormEvent } from 'react';
import { api } from '../../../../../../../service/api';
import styles from '../../../css/TemplateManagement.module.css';

type WheelType = 'simples' | 'duplo';
type AxisFunction = 'Direcional' | 'Tração' | 'Livre';

interface AxisItem {
  eixo: number;
  tipo: WheelType;
  funcao: AxisFunction;
  visual: string;
}

interface TemplateItem {
  id: number | string;
  nome_template?: string;
  nome?: string;
  matriz_json?: string;
  eixos?: AxisItem[];
}

const axisFunctions: AxisFunction[] = ['Direcional', 'Tração', 'Livre'];

function createAxis(index: number, tipo: WheelType, funcao: AxisFunction): AxisItem {
  const prefix = `E${index}`;
  const visual = tipo === 'simples'
    ? `${prefix}E - ${prefix}D`
    : `${prefix}EE ${prefix}IE - ${prefix}ID ${prefix}ED`;

  return { eixo: index, tipo, funcao, visual };
}

function parseAxes(template: TemplateItem): AxisItem[] {
  if (Array.isArray(template.eixos)) return template.eixos;
  if (!template.matriz_json) return [];

  try {
    const parsed = JSON.parse(template.matriz_json) as AxisItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeTemplates(response: unknown): TemplateItem[] {
  if (Array.isArray(response)) return response as TemplateItem[];
  if (!response || typeof response !== 'object') return [];
  const data = 'data' in response ? response.data : response;
  if (Array.isArray(data)) return data as TemplateItem[];
  if (data && typeof data === 'object') {
    const object = data as Record<string, unknown>;
    for (const key of ['items', 'results', 'templates']) {
      if (Array.isArray(object[key])) return object[key] as TemplateItem[];
    }
  }
  return [];
}

export default function TemplateManagement() {
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [selected, setSelected] = useState<TemplateItem | null>(null);
  const [name, setName] = useState('');
  const [wheelType, setWheelType] = useState<WheelType>('simples');
  const [axisFunction, setAxisFunction] = useState<AxisFunction>('Direcional');
  const [axes, setAxes] = useState<AxisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadTemplates = async () => {
    try {
      setError('');
      const response = await api.get('templates');
      setTemplates(normalizeTemplates(response));
    } catch (requestError) {
      console.error('Erro ao carregar templates:', requestError);
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar os templates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const addAxis = () => {
    setAxes((current) => [...current, createAxis(current.length, wheelType, axisFunction)]);
  };

  const removeAxis = (index: number) => {
    setAxes((current) => current.filter((_, itemIndex) => itemIndex !== index).map((axis, axisIndex) => ({ ...axis, eixo: axisIndex })));
  };

  const selectTemplate = (template: TemplateItem) => {
    setSelected(template);
    setName(template.nome_template || template.nome || '');
    setAxes(parseAxes(template));
  };

  const clearForm = () => {
    setSelected(null);
    setName('');
    setAxes([]);
    setWheelType('simples');
    setAxisFunction('Direcional');
  };

  const saveTemplate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || axes.length === 0) {
      setError('Informe um nome e adicione pelo menos um eixo.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await api.post('templates', {
        nome_template: name.trim(),
        matriz_json: JSON.stringify(axes),
      });
      clearForm();
      await loadTemplates();
    } catch (requestError) {
      console.error('Erro ao salvar template:', requestError);
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível salvar o template.');
    } finally {
      setSaving(false);
    }
  };

  const axisPreview = axes.map((axis) => `${axis.visual} -> eixo ${axis.eixo}, ${axis.funcao.toLowerCase()}`).join('\n');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Configuração da frota</span>
          <h1 className={styles.title}>Templates de eixos</h1>
          <p className={styles.subtitle}>Crie layouts reutilizáveis para configurar veículos com consistência.</p>
        </div>
        <button type="button" className={styles.primaryButton} onClick={clearForm}>+ Novo template</button>
      </header>

      <section className={styles.metrics}>
        <div className={styles.metric}><span className={styles.metricLabel}>Templates cadastrados</span><strong className={styles.metricValue}>{templates.length}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Eixos no editor</span><strong className={styles.metricValue}>{axes.length}</strong></div>
        <div className={styles.metric}><span className={styles.metricLabel}>Status</span><strong className={styles.metricValue}>{saving ? 'Salvando' : 'Pronto'}</strong></div>
      </section>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.layout}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Templates salvos</h2>
            <button type="button" className={styles.iconButton} onClick={loadTemplates} aria-label="Atualizar templates">Atualizar</button>
          </div>
          {loading ? <div className={styles.empty}>Carregando templates...</div> : templates.length === 0 ? <div className={styles.empty}>Nenhum template cadastrado.</div> : (
            <div className={styles.list}>
              {templates.map((template) => {
                const templateName = template.nome_template || template.nome || 'Template sem nome';
                const templateAxes = parseAxes(template);
                return (
                  <button key={template.id} type="button" className={`${styles.templateButton} ${selected?.id === template.id ? styles.templateSelected : ''}`} onClick={() => selectTemplate(template)}>
                    <span className={styles.templateName}>{templateName}</span>
                    <span className={styles.templateMeta}>{templateAxes.length} {templateAxes.length === 1 ? 'eixo' : 'eixos'}</span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}><h2 className={styles.panelTitle}>{selected ? 'Editar template' : 'Novo template'}</h2></div>
          <form className={styles.form} onSubmit={saveTemplate}>
            <div className={styles.formGroup}><label htmlFor="template-name">Nome do template</label><input id="template-name" className={styles.input} value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Cavalo trucado 6x2" required /></div>
            <div className={styles.formGroup}><label htmlFor="wheel-type">Tipo de rodado</label><select id="wheel-type" className={styles.select} value={wheelType} onChange={(event) => setWheelType(event.target.value as WheelType)}><option value="simples">Simples</option><option value="duplo">Duplo</option></select></div>
            <div className={styles.formGroup}><label htmlFor="axis-function">Função do eixo</label><select id="axis-function" className={styles.select} value={axisFunction} onChange={(event) => setAxisFunction(event.target.value as AxisFunction)}>{axisFunctions.map((value) => <option key={value} value={value}>{value}</option>)}</select></div>
            <button type="button" className={styles.addButton} onClick={addAxis}>+ Adicionar eixo</button>

            <div className={styles.axisList}>
              {axes.length === 0 ? <div className={styles.empty}>Adicione eixos para montar o layout.</div> : axes.map((axis, index) => (
                <div className={styles.axisItem} key={`${axis.eixo}-${axis.visual}`}>
                  <div className={styles.axisInfo}><strong>Eixo {axis.eixo}</strong><span>{axis.visual} • {axis.funcao}</span></div>
                  <button type="button" className={styles.iconButton} onClick={() => removeAxis(index)} aria-label={`Remover eixo ${axis.eixo}`}>Remover</button>
                </div>
              ))}
            </div>

            {axisPreview && <div className={styles.preview}>{axisPreview}</div>}
            <div className={styles.actions}><button type="button" className={styles.secondaryButton} onClick={clearForm}>Limpar</button><button type="submit" className={styles.primaryButton} disabled={saving}>{saving ? 'Salvando...' : 'Salvar template'}</button></div>
          </form>
        </section>
      </div>
    </div>
  );
}
