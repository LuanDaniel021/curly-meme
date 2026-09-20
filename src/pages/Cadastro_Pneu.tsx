import { useState } from 'react';

function CadastroPneu() {
  // Estados para os campos do formulário
  const [fogo, setFogo] = useState('');
  const [serie, setSerie] = useState('');
  const [marca, setMarca] = useState('');
  const [medida, setMedida] = useState('');
  const [statusVida, setStatusVida] = useState('novo');
  const [statusPneu, setStatusPneu] = useState('estoque');
  const [dot, setDot] = useState('');
  const [sulcoInicial, setSulcoInicial] = useState('');
  const [pressaoInicial, setPressaoInicial] = useState('');
  const [valorCompra, setValorCompra] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dadosFormulario = {
      fogo,
      serie,
      marca,
      medida,
      statusVida,
      statusPneu,
      dot,
      sulcoInicial,
      pressaoInicial,
      valorCompra,
      observacoes
    };
    console.log('Dados do Pneu:', dadosFormulario);
    // Aqui você faria o envio para sua API
  };

  return (
    <div className="body-container">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Cadastro de Pneu</h2>
          </div>

          <form onSubmit={handleSubmit} data-api-endpoint="/pneus">
            
            {/* Identificação do Pneu */}
            <div className="section-title">01. Identificação</div>
            
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="fogo">Nº de Fogo / Código*</label>
                <input 
                  type="text" 
                  id="fogo" 
                  value={fogo} 
                  onChange={(e) => setFogo(e.target.value)} 
                  placeholder="Ex: PN-0042" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="serie">Nº de Série (Fábrica)</label>
                <input 
                  type="text" 
                  id="serie" 
                  value={serie} 
                  onChange={(e) => setSerie(e.target.value)} 
                  placeholder="Ex: 849302911" 
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="marca">Marca*</label>
                <input 
                  type="text" 
                  id="marca" 
                  value={marca} 
                  onChange={(e) => setMarca(e.target.value)} 
                  placeholder="Ex: Michelin, Goodyear" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="medida">Medida / Dimensão*</label>
                <input 
                  type="text" 
                  id="medida" 
                  value={medida} 
                  onChange={(e) => setMedida(e.target.value)} 
                  placeholder="Ex: 295/80 R22.5" 
                  required 
                />
              </div>
            </div>

            {/* Condição e Vida Útil */}
            <div className="section-title">02. Status e Ciclo de Vida</div>

            <div className="grid-3">
              <div className="form-group">
                <label htmlFor="status_vida">Vida Atual*</label>
                <select 
                  id="status_vida" 
                  value={statusVida} 
                  onChange={(e) => setStatusVida(e.target.value)} 
                  required
                >
                  <option value="novo">Novo (Original)</option>
                  <option value="r1">1ª Recapagem (R1)</option>
                  <option value="r2">2ª Recapagem (R2)</option>
                  <option value="r3">3ª Recapagem (R3)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status_pneu">Situação*</label>
                <select 
                  id="status_pneu" 
                  value={statusPneu} 
                  onChange={(e) => setStatusPneu(e.target.value)} 
                  required
                >
                  <option value="estoque">Em Estoque</option>
                  <option value="aplicado">Aplicado em Veículo</option>
                  <option value="manutencao">Em Manutenção/Reforma</option>
                  <option value="descartado">Descartado/Sucata</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dot">DOT / Fabricações</label>
                <input 
                  type="text" 
                  id="dot" 
                  value={dot} 
                  onChange={(e) => setDot(e.target.value)} 
                  placeholder="Ex: 1223" 
                  maxLength={4} 
                />
              </div>
            </div>

            {/* Dados Técnicos Iniciais */}
            <div className="section-title">03. Medição Inicial (Calibração)</div>

            <div className="grid-3">
              <div className="form-group">
                <label htmlFor="sulco_inicial">Sulco Atual (mm)*</label>
                <input 
                  type="number" 
                  id="sulco_inicial" 
                  value={sulcoInicial} 
                  onChange={(e) => setSulcoInicial(e.target.value)} 
                  step="0.1" 
                  placeholder="18.0" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="pressao_inicial">Pressão Atual (PSI)*</label>
                <input 
                  type="number" 
                  id="pressao_inicial" 
                  value={pressaoInicial} 
                  onChange={(e) => setPressaoInicial(e.target.value)} 
                  placeholder="105" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="valor_compra">Valor de Compra (R$)</label>
                <input 
                  type="number" 
                  id="valor_compra" 
                  value={valorCompra} 
                  onChange={(e) => setValorCompra(e.target.value)} 
                  step="0.01" 
                  placeholder="0,00" 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observacoes">Observações Gerais</label>
              <textarea 
                id="observacoes" 
                value={observacoes} 
                onChange={(e) => setObservacoes(e.target.value)} 
                rows={3} 
                placeholder="Informações adicionais sobre o pneu..."
              />
            </div>

            <button type="submit" className="btn-submit">Salvar Pneu</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroPneu;