import { useState, type FormEvent } from 'react';

function EnvioRecapagem() {
  // Estados para os campos do formulário
  const [pneuId, setPneuId] = useState('');
  const [tipoServico, setTipoServico] = useState('recapagem');
  const [fornecedorId, setFornecedorId] = useState('');
  const [numeroOrdemServico, setNumeroOrdemServico] = useState('');
  const [dataEnvio, setDataEnvio] = useState('');
  const [previsaoRetorno, setPrevisaoRetorno] = useState('');
  const [custoEstimado, setCustoEstimado] = useState('');
  const [desenhoBanda, setDesenhoBanda] = useState('');
  const [proximaVida, setProximaVida] = useState('R1');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dadosEnvio = {
      pneuId,
      tipoServico,
      fornecedorId,
      numeroOrdemServico,
      dataEnvio,
      previsaoRetorno,
      custoEstimado,
      desenhoBanda,
      proximaVida,
      observacoes
    };
    console.log('Dados do Envio para Recapagem:', dadosEnvio);
    // Aqui podes integrar o envio para a API (ex: api.post('/manutencoes', dadosEnvio))
  };

  return (
    <div className="body-container">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Envio para Reformadora / Recapagem</h2>
          </div>

          <form onSubmit={handleSubmit} data-api-endpoint="/manutencoes">
            
            {/* 01. SELEÇÃO DO PNEU */}
            <div className="section-title" style={{ marginTop: 0 }}>01. Identificação do Pneu</div>
            
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="pneu_id">Selecione o Pneu (Nº Fogo)*</label>
                <select 
                  id="pneu_id" 
                  value={pneuId} 
                  onChange={(e) => setPneuId(e.target.value)} 
                  required
                >
                  <option value="">Selecione da lista...</option>
                  <option value="1">PN-0042 - Michelin 295/80 (Vida 0 - Novo)</option>
                  <option value="2">PN-0089 - Goodyear 295/80 (Vida 1 - R1)</option>
                  <option value="3">PN-0105 - Bridgestone 295/80 (Estoque)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="tipo_servico">Serviço Solicitado*</label>
                <select 
                  id="tipo_servico" 
                  value={tipoServico} 
                  onChange={(e) => setTipoServico(e.target.value)} 
                  required
                >
                  <option value="recapagem">Recapagem / Recapagem + Vulcanização</option>
                  <option value="vulcanizacao">Apenas Vulcanização / Conserto</option>
                  <option value="manutencao_roda">Manutenção de Roda / Pintura</option>
                </select>
              </div>
            </div>

            {/* 02. FORNECEDOR E ORÇAMENTO */}
            <div className="section-title">02. Prestador de Serviço e Custos</div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="fornecedor_id">Reformadora / Prestador*</label>
                <select 
                  id="fornecedor_id" 
                  value={fornecedorId} 
                  onChange={(e) => setFornecedorId(e.target.value)} 
                  required
                >
                  <option value="">Selecione a empresa...</option>
                  <option value="1">Bandag / Recapadora Centro-Oeste</option>
                  <option value="2">Tireshop Reforma de Pneus LTDA</option>
                  <option value="3">Pneus Renovados Brasil</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="numero_ordem_servico">Nº da O.S. / Coleta</label>
                <input 
                  type="text" 
                  id="numero_ordem_servico" 
                  value={numeroOrdemServico} 
                  onChange={(e) => setNumeroOrdemServico(e.target.value)} 
                  placeholder="Ex: OS-2026-881" 
                />
              </div>
            </div>

            <div className="grid-3">
              <div className="form-group">
                <label htmlFor="data_envio">Data de Envio*</label>
                <input 
                  type="date" 
                  id="data_envio" 
                  value={dataEnvio} 
                  onChange={(e) => setDataEnvio(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="previsao_retorno">Previsão Retorno</label>
                <input 
                  type="date" 
                  id="previsao_retorno" 
                  value={previsaoRetorno} 
                  onChange={(e) => setPrevisaoRetorno(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="custo_estimado">Valor Estimado (R$)*</label>
                <input 
                  type="number" 
                  step="0.01" 
                  id="custo_estimado" 
                  value={custoEstimado} 
                  onChange={(e) => setCustoEstimado(e.target.value)} 
                  placeholder="550,00" 
                  required 
                />
              </div>
            </div>

            {/* 03. TIPO DE BANDA DE RODAGEM */}
            <div className="section-title">03. Especificações Técnicas Solicitadas</div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="desenho_banda">Modelo/Desenho da Banda</label>
                <input 
                  type="text" 
                  id="desenho_banda" 
                  value={desenhoBanda} 
                  onChange={(e) => setDesenhoBanda(e.target.value)} 
                  placeholder="Ex: Bandag BDR-HT / Mi27" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="proxima_vida">Nova Vida do Pneu*</label>
                <select 
                  id="proxima_vida" 
                  value={proximaVida} 
                  onChange={(e) => setProximaVida(e.target.value)} 
                  required
                >
                  <option value="R1">R1 (1ª Recapagem)</option>
                  <option value="R2">R2 (2ª Recapagem)</option>
                  <option value="R3">R3 (3ª Recapagem)</option>
                </select>
              </div>
            </div>

            {/* 04. ANEXOS */}
            <div className="section-title">04. Documentação e Laudo</div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="comprovante_coleta">Comprovante de Coleta / O.S. (PDF/Imagem)</label>
                <input type="file" id="comprovante_coleta" name="comprovante_coleta" accept=".pdf,image/*" />
              </div>
              <div className="form-group">
                <label htmlFor="laudo_recusa">Laudo de Descarte (caso recusado)</label>
                <input type="file" id="laudo_recusa" name="laudo_recusa" accept=".pdf,image/*" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observacoes">Observações Gerais</label>
              <textarea 
                id="observacoes" 
                value={observacoes} 
                onChange={(e) => setObservacoes(e.target.value)} 
                rows={2} 
                placeholder="Ex: Pneu enviado com pequeno dano no talão esquerdo para avaliação..."
              />
            </div>

            <button type="submit" className="btn-submit">Registrar Envio para Recapagem</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnvioRecapagem;