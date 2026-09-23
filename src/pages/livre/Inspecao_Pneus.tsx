import { useState, type FormEvent } from 'react';

function CadastroPneu() {
  // Estados para os campos do formulário
  const [veiculoId, setVeiculoId] = useState('');
  const [kmAtual, setKmAtual] = useState('');
  const [rodaAtiva, setRodaAtiva] = useState({ codigo: 'E0E', fogo: 'PN-0042', titulo: 'Roda: E0E (Dianteira Esquerda)' });
  const [pressao, setPressao] = useState('');
  const [sulcoMenor, setSulcoMenor] = useState('');
  const [estadoBanda, setEstadoBanda] = useState('normal');
  const [observacaoInspecao, setObservacaoInspecao] = useState('');

  // Função para lidar com a seleção dinâmica das rodas
  const selecionarRoda = (codigo: string, fogo: string, descricao: string) => {
    setRodaAtiva({ codigo, fogo, titulo: `Roda: ${codigo} (${descricao})` });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dadosInspecao = {
      veiculoId,
      kmAtual,
      rodaSelecionada: rodaAtiva.codigo,
      fogoPneu: rodaAtiva.fogo,
      pressao,
      sulcoMenor,
      estadoBanda,
      observacaoInspecao
    };
    console.log('Dados da Aferição Rápida:', dadosInspecao);
    // Aqui podes integrar com a API (`api.post(...)`)
  };

  return (
    <div className="body-container">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Aferição Rápida de Campo</h2>
          </div>

          <form onSubmit={handleSubmit} data-api-endpoint="/medicao-pneus">
            
            {/* 01. SELEÇÃO DO VEÍCULO */}
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="veiculo_id">Veículo / Placa*</label>
                <select 
                  id="veiculo_id" 
                  value={veiculoId} 
                  onChange={(e) => setVeiculoId(e.target.value)} 
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="1">ABC1D23 - Cargo 816</option>
                  <option value="2">XYZ9876 - FH 540</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="km_atual">KM Atual*</label>
                <input 
                  type="number" 
                  id="km_atual" 
                  value={kmAtual} 
                  onChange={(e) => setKmAtual(e.target.value)} 
                  placeholder="45200" 
                  required 
                />
              </div>
            </div>

            {/* 02. SELETOR DE RODA */}
            <div className="section-title">02. Selecione a Roda para Aferir</div>

            <div className="wheel-selector-grid">
              <div 
                className={`wheel-btn ${rodaAtiva.codigo === 'E0E' ? 'active' : ''}`} 
                onClick={() => selecionarRoda('E0E', 'PN-0042', 'Dianteira Esquerda')}
              >
                <span className="code">E0E</span>
                <span className="fogo">PN-0042</span>
                <span className="status-dot status-ok"></span>
              </div>
              <div 
                className={`wheel-btn ${rodaAtiva.codigo === 'E0D' ? 'active' : ''}`} 
                onClick={() => selecionarRoda('E0D', 'PN-0089', 'Dianteira Direita')}
              >
                <span className="code">E0D</span>
                <span className="fogo">PN-0089</span>
                <span className="status-dot status-warn"></span>
              </div>
              <div 
                className={`wheel-btn ${rodaAtiva.codigo === 'E1EE' ? 'active' : ''}`} 
                onClick={() => selecionarRoda('E1EE', 'PN-0102', 'Tração Externa Esquerda')}
              >
                <span className="code">E1EE</span>
                <span className="fogo">PN-0102</span>
                <span className="status-dot status-ok"></span>
              </div>
              <div 
                className={`wheel-btn ${rodaAtiva.codigo === 'E1IE' ? 'active' : ''}`} 
                onClick={() => selecionarRoda('E1IE', 'PN-0105', 'Tração Interna Esquerda')}
              >
                <span className="code">E1IE</span>
                <span className="fogo">PN-0105</span>
                <span className="status-dot status-danger"></span>
              </div>
            </div>

            {/* 03. FORMULÁRIO DE MEDIÇÃO DA RODA SELECIONADA */}
            <div className="measurement-box">
              <div className="active-wheel-header">
                <span className="active-wheel-title" id="rodaAtivaTitulo">{rodaAtiva.titulo}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-title)' }} id="rodaAtivaFogo">
                  Pneu: {rodaAtiva.fogo}
                </span>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label htmlFor="pressao">Pressão Lida (PSI)*</label>
                  <input 
                    type="number" 
                    id="pressao" 
                    value={pressao} 
                    onChange={(e) => setPressao(e.target.value)} 
                    placeholder="105" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sulco_menor">Sulco Mínimo (mm)*</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    id="sulco_menor" 
                    value={sulcoMenor} 
                    onChange={(e) => setSulcoMenor(e.target.value)} 
                    placeholder="12.0" 
                    required 
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label htmlFor="estado_banda">Condição da Banda*</label>
                  <select 
                    id="estado_banda" 
                    value={estadoBanda} 
                    onChange={(e) => setEstadoBanda(e.target.value)} 
                    required
                  >
                    <option value="normal">Normal / Regular</option>
                    <option value="desgaste_irregular">Desgaste Irregular</option>
                    <option value="corte_avaria">Corte / Avaria</option>
                    <option value="objeto_cravado">Objeto Cravado</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="foto_avaria">Foto do Pneu / Avaria</label>
                  <input type="file" id="foto_avaria" name="foto_avaria" accept="image/*" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observacao_inspecao">Observações do Inspetor</label>
              <textarea 
                id="observacao_inspecao" 
                value={observacaoInspecao} 
                onChange={(e) => setObservacaoInspecao(e.target.value)} 
                rows={2} 
                placeholder="Observações adicionais ou recomendação de alinhamento..."
              />
            </div>

            <button type="submit" className="btn-submit">Registrar Aferição</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroPneu;