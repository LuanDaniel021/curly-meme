import { useState } from 'react';

function RodizioPneus() {
  // Estados para os campos do formulário
  const [veiculoOrigem, setVeiculoOrigem] = useState('');
  const [posicaoOrigem, setPosicaoOrigem] = useState('');
  
  // Informações dinâmicas do pneu selecionado
  const [infoPneu, setInfoPneu] = useState({
    fogo: 'PN-0042',
    marca: 'Michelin 295/80',
    sulco: '12.0 mm'
  });

  const [tipoMovimentacao, setTipoMovimentacao] = useState('rodizio_mesmo');
  const [veiculoDestino, setVeiculoDestino] = useState('mesmo');
  const [posicaoDestino, setPosicaoDestino] = useState('');
  const [kmTroca, setKmTroca] = useState('');
  const [motivo, setMotivo] = useState('preventivo');
  const [observacoes, setObservacoes] = useState('');

  // Função para simular a mudança de dados do pneu com base na posição escolhida
  const handlePosicaoOrigemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    setPosicaoOrigem(valor);

    // Exemplo de dados simulados conforme o select original
    if (valor === 'E0E') {
      setInfoPneu({ fogo: 'PN-0042', marca: 'Michelin 295/80', sulco: '12.0 mm' });
    } else if (valor === 'E0D') {
      setInfoPneu({ fogo: 'PN-0089', marca: 'Goodyear 295/80', sulco: '10.0 mm' });
    } else if (valor === 'E1EE') {
      setInfoPneu({ fogo: 'PN-0102', marca: 'Bridgestone 295/80', sulco: '8.0 mm' });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dadosFormulario = {
      veiculoOrigem,
      posicaoOrigem,
      tipoMovimentacao,
      veiculoDestino,
      posicaoDestino,
      kmTroca,
      motivo,
      observacoes
    };
    console.log('Dados da Movimentação:', dadosFormulario);
    // Aqui você faria o envio para sua API
  };

  // Verifica se deve exibir os campos de destino do veículo
  const mostrarDestinoVeiculo = tipoMovimentacao !== 'estoque' && tipoMovimentacao !== 'recapagem';

  return (
    <div className="body-container">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>Rodízio & Movimentação de Pneus</h2>
          </div>

          <form onSubmit={handleSubmit} data-api-endpoint="/viagens">
            
            {/* 01. ORIGEM */}
            <div className="section-title" style={{ marginTop: 0 }}>01. Origem (Atual Posição)</div>
            
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="veiculo_origem">Veículo de Origem*</label>
                <select 
                  id="veiculo_origem" 
                  value={veiculoOrigem} 
                  onChange={(e) => setVeiculoOrigem(e.target.value)} 
                  required
                >
                  <option value="">Selecione o veículo...</option>
                  <option value="1">ABC1D23 - Cargo 816</option>
                  <option value="2">XYZ9876 - FH 540</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="posicao_origem">Posição / Rodado Atual*</label>
                <select 
                  id="posicao_origem" 
                  value={posicaoOrigem} 
                  onChange={handlePosicaoOrigemChange} 
                  required
                >
                  <option value="">Selecione a posição...</option>
                  <option value="E0E">E0E - Dianteiro Esquerdo</option>
                  <option value="E0D">E0D - Dianteiro Direito</option>
                  <option value="E1EE">E1EE - Traseiro Ext. Esquerdo</option>
                </select>
              </div>
            </div>

            {/* Card Informativo do Pneu Selecionado */}
            <div className="pneu-info-card" id="cardPneuInfo">
              <div className="pneu-info-item">
                <span className="label">Nº Fogo</span>
                <span className="value">{infoPneu.fogo}</span>
              </div>
              <div className="pneu-info-item">
                <span className="label">Marca / Medida</span>
                <span className="value">{infoPneu.marca}</span>
              </div>
              <div className="pneu-info-item">
                <span className="label">Sulco Atual</span>
                <span className="value" style={{ color: 'var(--primary-blue, #4f46e5)' }}>{infoPneu.sulco}</span>
              </div>
            </div>

            {/* 02. DESTINO */}
            <div className="section-title">02. Destino da Movimentação</div>

            <div className="form-group">
              <label htmlFor="tipo_movimentacao">Tipo de Operação*</label>
              <select 
                id="tipo_movimentacao" 
                value={tipoMovimentacao} 
                onChange={(e) => setTipoMovimentacao(e.target.value)} 
                required
              >
                <option value="rodizio_mesmo">Rodízio no mesmo veículo</option>
                <option value="troca_veiculo">Transferir para outro veículo</option>
                <option value="estepe">Mover para Estepe</option>
                <option value="estoque">Desmontar para Estoque</option>
                <option value="recapagem">Enviar para Recapagem / Manutenção</option>
              </select>
            </div>

            {mostrarDestinoVeiculo && (
              <div className="grid-2" id="boxDestinoVeiculo">
                <div className="form-group">
                  <label htmlFor="veiculo_destino">Veículo de Destino*</label>
                  <select 
                    id="veiculo_destino" 
                    value={veiculoDestino} 
                    onChange={(e) => setVeiculoDestino(e.target.value)}
                  >
                    <option value="mesmo">Mesmo Veículo (ABC1D23)</option>
                    <option value="2">XYZ9876 - FH 540</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="posicao_destino">Nova Posição / Rodado*</label>
                  <select 
                    id="posicao_destino" 
                    value={posicaoDestino} 
                    onChange={(e) => setPosicaoDestino(e.target.value)}
                  >
                    <option value="">Selecione o destino...</option>
                    <option value="E0D">E0D - Dianteiro Direito</option>
                    <option value="E1ED">E1ED - Traseiro Ext. Direito</option>
                    <option value="ESTEPE">EST1 - Estepe</option>
                  </select>
                </div>
              </div>
            )}

            {/* 03. DADOS DA OPERAÇÃO */}
            <div className="section-title">03. Detalhes do Lançamento</div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="km_troca">KM do Veículo no Momento*</label>
                <input 
                  type="number" 
                  id="km_troca" 
                  value={kmTroca} 
                  onChange={(e) => setKmTroca(e.target.value)} 
                  placeholder="Ex: 45200" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="motivo">Motivo da Movimentação*</label>
                <select 
                  id="motivo" 
                  value={motivo} 
                  onChange={(e) => setMotivo(e.target.value)} 
                  required
                >
                  <option value="preventivo">Rodízio Preventivo / Desgaste Regular</option>
                  <option value="desgaste_irregular">Correção de Desgaste Irregular</option>
                  <option value="furo_avaria">Furo / Avaria na Banda</option>
                  <option value="fim_vida">Fim de Vida Útil / Reforma</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observacoes">Observações do Borracheiro / Técnico</label>
              <textarea 
                id="observacoes" 
                value={observacoes} 
                onChange={(e) => setObservacoes(e.target.value)} 
                rows={2} 
                placeholder="Ex: Efetuado também o alinhamento do eixo dianteiro após a troca..."
              />
            </div>

            <button type="submit" className="btn-submit">Confirmar Movimentação</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RodizioPneus;