import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../service/api';
import styles from './CadastroUnificado.module.css';

function CadastroUnificado() {
  const navigate = useNavigate();

  // Estados para os dados do Veículo
  const [placa, setPlaca] = useState('');
  const [renavam, setRenavam] = useState('');
  const [chassi, setChassi] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anoFab, setAnoFab] = useState('');
  const [anoMod, setAnoMod] = useState('');
  const [kmInicial, setKmInicial] = useState('');
  const [carroceria, setCarroceria] = useState('');
  const [combustivel, setCombustivel] = useState('diesel');

  // Estado para o Template de Eixos
  const [templateEixos, setTemplateEixos] = useState('');

  // Estados para os dados do CRLV-e
  const [exercicio, setExercicio] = useState('');
  const [numeroCrlv, setNumeroCrlv] = useState('');
  const [codigoSeguranca, setCodigoSeguranca] = useState('');
  const [ufVeiculo, setUfVeiculo] = useState('');
  const [nomeProprietario, setNomeProprietario] = useState('');
  const [documentoProprietario, setDocumentoProprietario] = useState('');
  const [categoria, setCategoria] = useState('aluguel');
  const [rntrc, setRntrc] = useState('');
  const [observacoes, setObservacoes] = useState('');

  // Estados para os Ficheiros (PDF do CRLV e Foto)
  const [, setArquivoCrlv] = useState<File | null>(null);
  const [, setFotoVeiculo] = useState<File | null>(null);

  // Textos de preview baseados na seleção do template
  const previews: Record<string, string> = {
    "1": "E0E - E0D -> eixo 0, direcional\nE1EE E1IE - E1ID E1ED -> eixo 1, tração",
    "2": "E0E - E0D -> eixo 0, direcional\nE1EE E1IE - E1ID E1ED -> eixo 1, tração\nE2EE E2IE - E2ID E2ED -> eixo 2, livre",
    "3": "E0EE E0IE - E0ID E0ED -> eixo 0, livre\nE1EE E1IE - E1ID E1ED -> eixo 1, livre\nE2EE E2IE - E2ID E2ED -> eixo 2, livre"
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('placa', placa);
    // formData.append('renavam', renavam);
    // formData.append('chassi', chassi);
    // formData.append('marca', marca);
    // formData.append('modelo', modelo);
    // formData.append('anoFab', anoFab);
    // formData.append('anoMod', anoMod);
    // formData.append('kmInicial', kmInicial);
    // formData.append('carroceria', carroceria);
    // formData.append('combustivel', combustivel);
    // formData.append('templateEixos', templateEixos);
    // formData.append('exercicio', exercicio);
    // formData.append('numeroCrlv', numeroCrlv);
    // formData.append('codigoSeguranca', codigoSeguranca);
    // formData.append('ufVeiculo', ufVeiculo);
    // formData.append('nomeProprietario', nomeProprietario);
    // formData.append('documentoProprietario', documentoProprietario);
    // formData.append('categoria', categoria);
    // formData.append('rntrc', rntrc);
    // formData.append('observacoes', observacoes);

    // if (arquivoCrlv) {
    //   formData.append('arquivo_crlv', arquivoCrlv);
    // }
    
    // if (fotoVeiculo) {
    //   formData.append('foto_veiculo', fotoVeiculo);
    // }

    try {
      const response = await api.post('/veiculos', {
        "km": 1000,
        "crlv": {
          "uf": "SP",
          "crv": "123456789",
          "tipo": "Caminhão",
          "marca": "Mercedes-Benz",
          "placa": "ABC-1235",
          "chassi": "9BM12345678901236",
          "especie": "Caminhão de Carga",
          "renavam": "123456789016",
          "exercicio": 2023,
          "ano_modelo": 2022,
          "ano_fabricacao": 2021
        },
        "status": "Ativo",
        "template": "Caminhão 6x2"
      });

      console.log('Cadastro efetuado com sucesso:', response.data);
      alert('Veículo e CRLV salvos com sucesso!');
      navigate('/estoque'); 
    } catch (error) {
      console.error('Erro ao salvar o veículo e CRLV:', error);
      alert('Ocorreu um erro ao salvar os dados. Verifica os campos e tenta novamente.');
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
                    <label htmlFor="modelo">Modelo*</label>
                    <input 
                      type="text" 
                      id="modelo" 
                      value={modelo} 
                      onChange={(e) => setModelo(e.target.value)} 
                      placeholder="Ex: Cargo 816" 
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

            <div className={styles['grid-2']}>
                <div className={styles['form-group']}>
                    <label htmlFor="carroceria">Carroceria*</label>
                    <select 
                      id="carroceria" 
                      value={carroceria} 
                      onChange={(e) => setCarroceria(e.target.value)} 
                      required
                    >
                        <option value="">Selecione...</option>
                        <option value="trator">Cavalo Mecânico</option>
                        <option value="bau">Baú</option>
                        <option value="sider">Sider</option>
                        <option value="graneleiro">Graneleiro</option>
                        <option value="cacamba">Caçamba</option>
                    </select>
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="combustivel">Combustível*</label>
                    <select 
                      id="combustivel" 
                      value={combustivel} 
                      onChange={(e) => setCombustivel(e.target.value)} 
                      required
                    >
                        <option value="diesel">Diesel</option>
                        <option value="gnv">Gás Natural (GNV)</option>
                        <option value="eletrico">Elétrico</option>
                    </select>
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
                    <option value="1">Cavalo 4x2 (2 Eixos)</option>
                    <option value="2">Cavalo 6x2 Trucado (3 Eixos)</option>
                    <option value="3">Carreta 3 Eixos (Semirreboque)</option>
                </select>
            </div>

            {templateEixos && (
              <div className={styles['template-preview-card']} id="boxPreview">
                  <div className={styles['template-preview-title']}>Estrutura do Layout Selecionado</div>
                  <div className={styles['template-preview-code']} id="textoPreview" style={{ whiteSpace: 'pre-line' }}>
                    {previews[templateEixos]}
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

            <div className={styles['grid-2']}>
                <div className={styles['form-group']}>
                    <label htmlFor="codigo_seguranca">Código Segurança CLA*</label>
                    <input 
                      type="text" 
                      id="codigo_seguranca" 
                      value={codigoSeguranca} 
                      onChange={(e) => setCodigoSeguranca(e.target.value)} 
                      placeholder="000000000" 
                      required 
                    />
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
            </div>

            <div className={styles['grid-2']}>
                <div className={styles['form-group']}>
                    <label htmlFor="nome_proprietario">Nome / Razão Social Proprietário*</label>
                    <input 
                      type="text" 
                      id="nome_proprietario" 
                      value={nomeProprietario} 
                      onChange={(e) => setNomeProprietario(e.target.value)} 
                      placeholder="Logística Brasil LTDA" 
                      required 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="documento_proprietario">CPF / CNPJ Proprietário*</label>
                    <input 
                      type="text" 
                      id="documento_proprietario" 
                      value={documentoProprietario} 
                      onChange={(e) => setDocumentoProprietario(e.target.value)} 
                      placeholder="00.000.000/0001-00" 
                      required 
                    />
                </div>
            </div>

            <div className={styles['grid-2']}>
                <div className={styles['form-group']}>
                    <label htmlFor="categoria">Categoria*</label>
                    <select 
                      id="categoria" 
                      value={categoria} 
                      onChange={(e) => setCategoria(e.target.value)} 
                      required
                    >
                        <option value="aluguel">Aluguel (Placa Vermelha / Mercosul)</option>
                        <option value="particular">Particular</option>
                        <option value="oficial">Oficial</option>
                    </select>
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="rntrc">Nº RNTRC (ANTT)</label>
                    <input 
                      type="text" 
                      id="rntrc" 
                      value={rntrc} 
                      onChange={(e) => setRntrc(e.target.value)} 
                      placeholder="123456789" 
                    />
                </div>
            </div>

            {/* 04. MIDIAS E ARQUIVOS */}
            <div className={styles['section-title']}>04. Arquivos e Mídia</div>

            <div className={styles['grid-2']}>
                <div className={styles['form-group']}>
                    <label htmlFor="arquivo_crlv">PDF do CRLV-e*</label>
                    <input 
                      type="file" 
                      id="arquivo_crlv" 
                      name="arquivo_crlv" 
                      accept=".pdf,image/*" 
                      onChange={(e) => setArquivoCrlv(e.target.files ? e.target.files[0] : null)}
                      required 
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="foto_veiculo">Foto do Caminhão</label>
                    <input 
                      type="file" 
                      id="foto_veiculo" 
                      name="foto_veiculo" 
                      accept="image/*" 
                      onChange={(e) => setFotoVeiculo(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="observacoes">Observações Gerais</label>
                <textarea 
                  id="observacoes" 
                  value={observacoes} 
                  onChange={(e) => setObservacoes(e.target.value)} 
                  rows={2} 
                  placeholder="Histórico ou detalhes operacionais adicionais..." 
                />
            </div>

            <button type="submit" className={styles['btn-submit']}>Salvar Veículo e CRLV</button>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUnificado;