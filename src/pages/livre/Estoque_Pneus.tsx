import { useState, type FormEvent } from 'react';

function EstoquePneus() {
  // Estados para os campos do formulário de entrada
  const [numeroFogo, setNumeroFogo] = useState('');
  const [dot, setDot] = useState('');
  const [marca, setMarca] = useState('');
  const [medida, setMedida] = useState('');
  const [condicao, setCondicao] = useState('novo');
  const [valorCompra, setValorCompra] = useState('');
  const [sulcoInicial, setSulcoInicial] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dadosEstoque = {
      numeroFogo,
      dot,
      marca,
      medida,
      condicao,
      valorCompra,
      sulcoInicial,
      localizacao
    };
    console.log('Dados de Entrada no Estoque:', dadosEstoque);
    // Aqui podes integrar a chamada à API (ex: api.post('/pneus', dadosEstoque))
  };

  return (
    <div className="container">
      
      {/* RESUMO DE SALDO */}
      <div className="stock-summary">
        <div className="summary-box">
          <div className="count" style={{ color: 'var(--success)' }}>14</div>
          <div className="label">Pneus Novos</div>
        </div>
        <div className="summary-box">
          <div className="count" style={{ color: 'var(--primary-blue)' }}>8</div>
          <div className="label">Recapados (Prontos)</div>
        </div>
        <div className="summary-box">
          <div className="count" style={{ color: 'var(--warning)' }}>5</div>
          <div className="label">Usados / Estepes</div>
        </div>
      </div>

      {/* TABELA DE PNEUS DISPONÍVEIS */}
      <div className="card">
        <div className="card-header">
          <h2>Pneus em Estoque (Prontos para Aplicação)</h2>
        </div>

        <table className="stock-table">
          <thead>
            <tr>
              <th>Nº Fogo</th>
              <th>Marca / Medida</th>
              <th>Condição</th>
              <th>Vida</th>
              <th>Sulco</th>
              <th>Localização</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PN-0201</td>
              <td>Michelin 295/80 R22.5</td>
              <td><span className="badge badge-new">Novo</span></td>
              <td>Vida 0</td>
              <td>16.0 mm</td>
              <td>Prateleira A1</td>
            </tr>
            <tr>
              <td>PN-0118</td>
              <td>Bridgestone 295/80 R22.5</td>
              <td><span className="badge badge-recap">Recapado</span></td>
              <td>R1</td>
              <td>14.5 mm</td>
              <td>Prateleira B3</td>
            </tr>
            <tr>
              <td>PN-0094</td>
              <td>Goodyear 295/80 R22.5</td>
              <td><span className="badge badge-used">Usado</span></td>
              <td>Vida 0</td>
              <td>7.2 mm</td>
              <td>Pilhar Estepe</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FORMULÁRIO DE ENTRADA NO ESTOQUE */}
      <div className="card">
        <div className="card-header">
          <h2>Entrada de Pneu no Almoxarifado</h2>
        </div>

        <form onSubmit={handleSubmit} data-api-endpoint="/pneus">
          
          <div className="section-title" style={{ marginTop: 0 }}>01. Dados Principais</div>

          <div className="grid-2">
            <div className="form-group">
              <label htmlFor="numero_fogo">Nº Fogo / Matrícula*</label>
              <input 
                type="text" 
                id="numero_fogo" 
                value={numeroFogo} 
                onChange={(e) => setNumeroFogo(e.target.value)} 
                placeholder="Ex: PN-0202" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="dot">Código DOT (Fabricação)</label>
              <input 
                type="text" 
                id="dot" 
                value={dot} 
                onChange={(e) => setDot(e.target.value)} 
                placeholder="Ex: 1226" 
              />
            </div>
          </div>

          <div className="grid-3">
            <div className="form-group">
              <label htmlFor="marca">Marca*</label>
              <input 
                type="text" 
                id="marca" 
                value={marca} 
                onChange={(e) => setMarca(e.target.value)} 
                placeholder="Ex: Michelin" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="medida">Medida*</label>
              <input 
                type="text" 
                id="medida" 
                value={medida} 
                onChange={(e) => setMedida(e.target.value)} 
                placeholder="295/80 R22.5" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="condicao">Condição do Pneu*</label>
              <select 
                id="condicao" 
                value={condicao} 
                onChange={(e) => setCondicao(e.target.value)} 
                required
              >
                <option value="novo">Novo</option>
                <option value="recapado">Recapado</option>
                <option value="usado">Usado / Meia Vida</option>
              </select>
            </div>
          </div>

          <div className="section-title">02. Informações Financeiras e Local</div>

          <div className="grid-3">
            <div className="form-group">
              <label htmlFor="valor_compra">Valor de Custo (R$)*</label>
              <input 
                type="number" 
                step="0.01" 
                id="valor_compra" 
                value={valorCompra} 
                onChange={(e) => setValorCompra(e.target.value)} 
                placeholder="2400,00" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="sulco_inicial">Sulco Inicial (mm)*</label>
              <input 
                type="number" 
                step="0.1" 
                id="sulco_inicial" 
                value={sulcoInicial} 
                onChange={(e) => setSulcoInicial(e.target.value)} 
                placeholder="16.0" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="localizacao">Local no Almoxarifado</label>
              <input 
                type="text" 
                id="localizacao" 
                value={localizacao} 
                onChange={(e) => setLocalizacao(e.target.value)} 
                placeholder="Ex: Prateleira A2" 
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">Dar Entrada no Estoque</button>
        </form>
      </div>

    </div>
  );
}

export default EstoquePneus;