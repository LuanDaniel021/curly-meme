import { useState, type FormEvent } from 'react';
import styles from './Cadastro_Caminhao.module.css';

function CadastroCaminhao() {
  // Estados para os campos do formulário
  const [placa, setPlaca] = useState('');
  const [renavam, setRenavam] = useState('');
  const [chassi, setChassi] = useState('');
  const [templateEixos, setTemplateEixos] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anoFab, setAnoFab] = useState('');
  const [anoMod, setAnoMod] = useState('');
  const [kmInicial, setKmInicial] = useState('');
  const [carroceria, setCarroceria] = useState('');
  const [combustivel, setCombustivel] = useState('diesel');
  const [observacoes, setObservacoes] = useState('');

  // Textos de preview baseados na seleção do template
  const previews: Record<string, string> = {
    "1": "E0E - E0D -> eixo 0, direcional\nE1EE E1IE - E1ID E1ED -> eixo 1, tração",
    "2": "E0E - E0D -> eixo 0, direcional\nE1EE E1IE - E1ID E1ED -> eixo 1, tração\nE2EE E2IE - E2ID E2ED -> eixo 2, livre",
    "3": "E0EE E0IE - E0ID E0ED -> eixo 0, livre\nE1EE E1IE - E1ID E1ED -> eixo 1, livre\nE2EE E2IE - E2ID E2ED -> eixo 2, livre"
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dadosFormulario = {
      placa, renavam, chassi, templateEixos, marca, modelo, anoFab, anoMod, kmInicial, carroceria, combustivel, observacoes
    };
    console.log('Dados do Caminhão:', dadosFormulario);
    // Aqui farias o envio para a API
  };

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Cadastro de Veículo</h2>
          </div>

          <form onSubmit={handleSubmit} data-api-endpoint="/caminhoes">
            
            {/* Identificação */}
            <div className={styles.sectionTitle}>01. Identificação do Veículo</div>
            
            <div className={styles.grid2}>
              <div className={styles.formGroup}>
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
              <div className={styles.formGroup}>
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

            <div className={styles.formGroup}>
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

            {/* Template do Display de Rodas */}
            <div className={styles.sectionTitle}>02. Configuração do Display de Rodas</div>

            <div className={styles.formGroup}>
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

            {templateEixos && previews[templateEixos] && (
              <div className={styles.templatePreviewCard} id="boxPreview">
                <div className={styles.templatePreviewTitle}>Estrutura do Layout Selecionado</div>
                <div className={styles.templatePreviewCode} style={{ whiteSpace: 'pre-line' }}>
                  {previews[templateEixos]}
                </div>
              </div>
            )}

            {/* Especificações Técnicas */}
            <div className={styles.sectionTitle}>03. Especificações Técnicas</div>

            <div className={styles.grid2}>
              <div className={styles.formGroup}>
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
              <div className={styles.formGroup}>
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

            <div className={styles.grid3}>
              <div className={styles.formGroup}>
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
              <div className={styles.formGroup}>
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
              <div className={styles.formGroup}>
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

            <div className={styles.grid2}>
              <div className={styles.formGroup}>
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
              <div className={styles.formGroup}>
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

            {/* Documentos e Mídia */}
            <div className={styles.sectionTitle}>04. Informações Adicionais</div>

            <div className={styles.formGroup}>
              <label htmlFor="foto_veiculo">Foto do Veículo</label>
              <input type="file" id="foto_veiculo" name="foto_veiculo" accept="image/*" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="observacoes">Observações / Histórico</label>
              <textarea 
                id="observacoes" 
                value={observacoes} 
                onChange={(e) => setObservacoes(e.target.value)} 
                rows={3} 
                placeholder="Informações adicionais de manutenção ou restrições..."
              />
            </div>

            <button type="submit" className={styles.btnSubmit}>Salvar Veículo</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroCaminhao;