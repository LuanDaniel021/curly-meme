import { useState, type FormEvent } from "react";
import { api } from '../../../../../../../service/api';

import '../../../css/Templates.module.css';

// --- TIPOS ---
export type EixoItem = {
  eixo: number;
  tipo: "simples" | "duplo";
  funcao: "Direcional" | "Tração" | "Livre";
  visual: string;
  posicoes: string[];
};

type HeaderProps = {
  nomeTemplate: string;
  setNomeTemplate: (value: string) => void;
  tipoRodado: "simples" | "duplo";
  setTipoRodado: (value: "simples" | "duplo") => void;
  funcaoEixo: "Direcional" | "Tração" | "Livre";
  setFuncaoEixo: (value: "Direcional" | "Tração" | "Livre") => void;
  eixos: EixoItem[];
  onAddEixo: () => void;
  onRemoveEixo: (index: number) => void;
  onSubmit: (e: FormEvent) => void;
  salvando: boolean;
};

type ContentProps = {
  eixos: EixoItem[];
};

// --- SUBCOMPONENTE: HEADER ---
function Header({
  nomeTemplate,
  setNomeTemplate,
  tipoRodado,
  setTipoRodado,
  funcaoEixo,
  setFuncaoEixo,
  eixos,
  onAddEixo,
  onRemoveEixo,
  onSubmit,
  salvando,
}: HeaderProps) {
  const getBadgeClass = (funcao: string) => {
    const normalized = funcao
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return `badge-${normalized}`;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Configurar Eixos</h2>
      </div>

      <form onSubmit={onSubmit} id="formTemplate">
        <div className="form-group">
          <label htmlFor="nome_template">Nome do Template</label>
          <input
            type="text"
            id="nome_template"
            name="nome_template"
            placeholder="Ex: Cavalo Trucado (6x2)"
            value={nomeTemplate}
            onChange={(e) => setNomeTemplate(e.target.value)}
            required
          />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="tipo_rodado">Rodado</label>
            <select
              id="tipo_rodado"
              value={tipoRodado}
              onChange={(e) => setTipoRodado(e.target.value as "simples" | "duplo")}
            >
              <option value="simples">Simples (2 Pneus)</option>
              <option value="duplo">Duplo (4 Pneus)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="funcao_eixo">Função</label>
            <select
              id="funcao_eixo"
              value={funcaoEixo}
              onChange={(e) => setFuncaoEixo(e.target.value as "Direcional" | "Tração" | "Livre")}
            >
              <option value="Direcional">Direcional</option>
              <option value="Tração">Tração</option>
              <option value="Livre">Livre / Auxiliar</option>
            </select>
          </div>
        </div>

        <button type="button" className="btn-add" onClick={onAddEixo}>
          + Adicionar Eixo
        </button>

        {/* Lista Dinâmica */}
        <div className="axis-list" id="listaEixos">
          {eixos.map((item, index) => (
            <div key={index} className="axis-item">
              <div>
                <strong style={{ color: "var(--text-title)", fontSize: "12px" }}>
                  Eixo {item.eixo}
                </strong>{" "}
                <span className={`axis-badge ${getBadgeClass(item.funcao)}`}>
                  {item.funcao}
                </span>
              </div>
              <button
                type="button"
                className="btn-remove"
                onClick={() => onRemoveEixo(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-submit" disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar Template"}
        </button>
      </form>
    </div>
  );
}

// --- SUBCOMPONENTE: CONTENT ---
function Content({ eixos }: ContentProps) {
  const getTipoClass = (funcao: string) => {
    return funcao
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Visualização do Layout</h2>
      </div>

      <div className="visualizer-wrapper">
        <div className="chassis" id="chassisVisual">
          <div className="chassis-line"></div>

          {eixos.map((item, index) => (
            <div key={index} className={`visual-axis ${getTipoClass(item.funcao)}`}>
              <div className="wheel-pair">
                <div className="wheel"></div>
                {item.tipo === "duplo" && <div className="wheel"></div>}
              </div>
              <div className="axis-bar"></div>
              <div className="wheel-pair">
                <div className="wheel"></div>
                {item.tipo === "duplo" && <div className="wheel"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="code-preview" id="displayPreview">
        {eixos.length === 0
          ? "Aguardando inclusão de eixos..."
          : eixos.map(
              (item) =>
                `${item.visual} -> eixo ${item.eixo}, ${item.funcao.toLowerCase()}\n`
            )}
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function AxisBuilder() {
  const [nomeTemplate, setNomeTemplate] = useState("");
  const [tipoRodado, setTipoRodado] = useState<"simples" | "duplo">("simples");
  const [funcaoEixo, setFuncaoEixo] = useState<"Direcional" | "Tração" | "Livre">("Direcional");
  const [eixos, setEixos] = useState<EixoItem[]>([]);
  const [salvando, setSalvando] = useState(false);

  const gerarEstruturaEixos = (
    lista: Omit<EixoItem, "eixo" | "visual" | "posicoes">[]
  ): EixoItem[] => {
    return lista.map((item, idx) => {
      if (item.tipo === "simples") {
        const esq = `E${idx}E`;
        const dir = `E${idx}D`;
        return {
          eixo: idx,
          tipo: item.tipo,
          funcao: item.funcao,
          visual: `${esq} - ${dir}`,
          posicoes: [esq, "-", "-", dir],
        };
      }

      const ee = `E${idx}EE`;
      const ed = `E${idx}IE`;
      const id = `E${idx}ID`;
      const dd = `E${idx}ED`;
      return {
        eixo: idx,
        tipo: item.tipo,
        funcao: item.funcao,
        visual: `${ee} ${ed} - ${id} ${dd}`,
        posicoes: [ee, ed, id, dd],
      };
    });
  };

  const handleAddEixo = () => {
    const novosBase = [...eixos, { tipo: tipoRodado, funcao: funcaoEixo }];
    setEixos(gerarEstruturaEixos(novosBase));
  };

  const handleRemoveEixo = (index: number) => {
    const novosBase = eixos.filter((_, idx) => idx !== index);
    setEixos(gerarEstruturaEixos(novosBase));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nomeTemplate.trim()) {
      alert("Informe o nome do template.");
      return;
    }

    if (eixos.length === 0) {
      alert("Adicione pelo menos um eixo antes de salvar o template.");
      return;
    }

    const payload = {
      nome_template: nomeTemplate.trim(),
      matriz_json: JSON.stringify(eixos),
    };

    try {
      setSalvando(true);
      await api.post('/templates', payload);
      alert("Template salvo com sucesso!");
      setNomeTemplate("");
      setEixos([]);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert(error instanceof Error ? error.message : "Erro ao salvar template.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="container">
      <Header
        nomeTemplate={nomeTemplate}
        setNomeTemplate={setNomeTemplate}
        tipoRodado={tipoRodado}
        setTipoRodado={setTipoRodado}
        funcaoEixo={funcaoEixo}
        setFuncaoEixo={setFuncaoEixo}
        eixos={eixos}
        onAddEixo={handleAddEixo}
        onRemoveEixo={handleRemoveEixo}
        onSubmit={handleSubmit}
        salvando={salvando}
      />

      <Content eixos={eixos} />
    </div>
  );
}
