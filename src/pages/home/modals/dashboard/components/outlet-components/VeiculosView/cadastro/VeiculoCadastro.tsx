import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../../../../../service/api';
import styles from '../../../../css/VeiculoCadastro.module.css';

interface TemplateEixos {
  id: number | string;
  nome_template?: string;
  nome?: string;
  matriz_json?: string;
}

function normalizarTemplates(response: unknown): TemplateEixos[] {
  if (Array.isArray(response)) return response as TemplateEixos[];
  if (!response || typeof response !== 'object') return [];
  const data = 'data' in response ? response.data : response;
  if (Array.isArray(data)) return data as TemplateEixos[];
  if (data && typeof data === 'object') {
    const object = data as Record<string, unknown>;
    for (const key of ['items', 'results', 'templates']) {
      if (Array.isArray(object[key])) return object[key] as TemplateEixos[];
    }
  }
  return [];
}

function VeiculoCadastro() {
  const navigate = useNavigate();

  // Estados para os dados do Veículo
  const [placa, setPlaca] = useState('');
  const [renavam, setRenavam] = useState('');
  const [chassi, setChassi] = useState('');
  const [marca, setMarca] = useState('');
  const [anoFab, setAnoFab] = useState('');
  const [anoMod, setAnoMod] = useState('');
  const [kmInicial, setKmInicial] = useState('');
  const [tipo, setTipo] = useState('');

  // Estado para o Template de Eixos
  const [templateEixos, setTemplateEixos] = useState('');
  const [templates, setTemplates] = useState<TemplateEixos[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);

  // Estados para os dados do CRLV-e
  const [exercicio, setExercicio] = useState('');
  const [numeroCrlv, setNumeroCrlv] = useState('');
  const [ufVeiculo, setUfVeiculo] = useState('');

  useEffect(() => {
    const carregarTemplates = async () => {
      try {
        const response = await api.get('templates');
        setTemplates(normalizarTemplates(response));
      } catch (error) {
        console.error('Erro ao carregar templates de eixos:', error);
      } finally {
        setTemplatesLoading(false);
      }
    };

    carregarTemplates();
  }, []);

  const templateSelecionado = templates.find((template) => String(template.id) === templateEixos);
  const previewTemplate = templateSelecionado?.matriz_json || 'O template selecionado não possui uma pré-visualização.';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      km: kmInicial.trim(),
      crlv: {
        uf: ufVeiculo.trim(),
        crv: numeroCrlv.trim(),
        tipo: tipo.trim(),
        marca: marca.trim(),
        placa: placa.trim(),
        chassi: chassi.trim(),
        especie: tipo.trim(),
        renavam: renavam.trim(),
        exercicio: exercicio.trim(),
        ano_modelo: anoMod.trim(),
        ano_fabricacao: anoFab.trim(),
      },
      status: 'Ativo',
      template: templateEixos,
    };

    try {
      const response = await api.post('/veiculos', payload);
      console.log('Cadastro efetuado com sucesso:', response);
      alert('Veículo e CRLV salvos com sucesso!');
      navigate('/home');
    } catch (error) {
      console.error('Erro ao salvar o veículo e CRLV:', error);
      alert(error instanceof Error ? error.message : 'Ocorreu um erro ao salvar os dados. Verifica os campos e tenta novamente.');
    }
  };

  return (
    <div className={styles['body-container'] || ''}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles['card-header']}>
            <h2>Cadastro do Veículo & Documentação CRLV</h2>
          </div>

          <form onSubmit={handleSubmit} data-api-endpoint="/crlvs">
              
            {/* 01. DADOS DO VEÍCULO */}
            <div className={styles['section-title']} style={{ marginTop: 0 }}>01. Dados do Veículo</div>
            
            <div className={styles['grid-2']}>
                <div className={styles['form-group']}>
                    <label htmlFor="placa">Placa*</label>
                    <input 
                      type="text" 
                      id="placa" 
                      value={placa} 
                      onChange={(e) => setPlaca(e.target.value)} 
                      placeholder="ABC1D23" 
                      maxLength={8} 
                      required 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="renavam">RENAVAM*</label>
                    <input 
                      type="text" 
                      id="renavam" 
                      value={renavam} 
                      onChange={(e) => setRenavam(e.target.value)} 
                      maxLength={11} 
                      required 
                    />
                </div>
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="chassi">Número do Chassi*</label>
                <input 
                  type="text" 
                  id="chassi" 
                  value={chassi} 
                  onChange={(e) => setChassi(e.target.value)} 
                  placeholder="9BW ZZZ377 VT 000000" 
                  maxLength={17} 
                  required 
                />
            </div>

            <div className={styles['grid-2']}>
                <div className={styles['form-group']}>
                    <label htmlFor="marca">Marca*</label>
                    <input 
                      type="text" 
                      id="marca" 
                      value={marca} 
                      onChange={(e) => setMarca(e.target.value)} 
                      placeholder="Ex: Ford, Volvo, Scania" 
                      required 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="tipo">Tipo do Veículo*</label>
                    <input 
                      type="text" 
                      id="tipo" 
                      value={tipo} 
                      onChange={(e) => setTipo(e.target.value)} 
                      placeholder="Ex: Caminhão" 
                      required 
                    />
                </div>
            </div>

            <div className={styles['grid-3']}>
                <div className={styles['form-group']}>
                    <label htmlFor="ano_fab">Ano Fab.*</label>
                    <input 
                      type="number" 
                      id="ano_fab" 
                      value={anoFab} 
                      onChange={(e) => setAnoFab(e.target.value)} 
                      placeholder="2022" 
                      min="1950" 
                      max="2030" 
                      required 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="ano_mod">Ano Mod.*</label>
                    <input 
                      type="number" 
                      id="ano_mod" 
                      value={anoMod} 
                      onChange={(e) => setAnoMod(e.target.value)} 
                      placeholder="2023" 
                      min="1950" 
                      max="2030" 
                      required 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="km_inicial">KM Atual*</label>
                    <input 
                      type="number" 
                      id="km_inicial" 
                      value={kmInicial} 
                      onChange={(e) => setKmInicial(e.target.value)} 
                      placeholder="45200" 
                      required 
                    />
                </div>
            </div>

            {/* 02. DISPLAY DE EIXOS */}
            <div className={styles['section-title']}>02. Display de Rodas (Template)</div>

            <div className={styles['form-group']}>
                <label htmlFor="template_eixos_id">Template de Eixos*</label>
                <select 
                  id="template_eixos_id" 
                  value={templateEixos} 
                  onChange={(e) => setTemplateEixos(e.target.value)} 
                  required
                >
                    <option value="">Selecione o layout de rodas...</option>
                    {templatesLoading && <option value="" disabled>Carregando templates...</option>}
                    {!templatesLoading && templates.length === 0 && (
                      <option value="" disabled>Nenhum template cadastrado</option>
                    )}
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.nome_template || template.nome || `Template ${template.id}`}
                      </option>
                    ))}
                </select>
            </div>

            {templateEixos && (
              <div className={styles['template-preview-card']} id="boxPreview">
                  <div className={styles['template-preview-title']}>Estrutura do Layout Selecionado</div>
                  <div className={styles['template-preview-code']} id="textoPreview" style={{ whiteSpace: 'pre-line' }}>
                    {previewTemplate}
                  </div>
              </div>
            )}

            {/* 03. DADOS DO CRLV-e */}
            <div className={styles['section-title']}>03. Documentação CRLV-e</div>

            <div className={styles['grid-2']}>
                <div className={styles['form-group']}>
                    <label htmlFor="exercicio">Ano Exercício*</label>
                    <input 
                      type="number" 
                      id="exercicio" 
                      value={exercicio} 
                      onChange={(e) => setExercicio(e.target.value)} 
                      placeholder="2026" 
                      min="2020" 
                      max="2035" 
                      required 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="numero_crlv">Número do CRLV-e*</label>
                    <input 
                      type="text" 
                      id="numero_crlv" 
                      value={numeroCrlv} 
                      onChange={(e) => setNumeroCrlv(e.target.value)} 
                      placeholder="01234567890" 
                      required 
                    />
                </div>
            </div>

            <div className={styles['form-group']}>
                    <label htmlFor="uf_veiculo">UF Licenciamento*</label>
                    <select 
                      id="uf_veiculo" 
                      value={ufVeiculo} 
                      onChange={(e) => setUfVeiculo(e.target.value)} 
                      required
                    >
                        <option value="">Selecione...</option>
                        <option value="SP">São Paulo (SP)</option>
                        <option value="RJ">Rio de Janeiro (RJ)</option>
                        <option value="MG">Minas Gerais (MG)</option>
                        <option value="PR">Paraná (PR)</option>
                        <option value="SC">Santa Catarina (SC)</option>
                        <option value="RS">Rio Grande do Sul (RS)</option>
                    </select>
            </div>

            <button type="submit" className={styles['btn-submit']}>Salvar Veículo e CRLV</button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default VeiculoCadastro;