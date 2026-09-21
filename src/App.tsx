import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Páginas de Autenticação e Perfil
import Login from './pages/Login';
import PerfilUsuario from './pages/Perfil_Usuario';

// Páginas Operacionais / Vida Útil dos Pneus (Cliente / Operador)
import CadastroUnificado from './pages/CadastroUnificado';
import CadastroCaminhao from './pages/Cadastro_Caminhao';
import CadastroPneu from './pages/Cadastro_Pneu';
import RodizioPneus from './pages/Rodizio_Pneus';
import EstoquePneus from './pages/Estoque_Pneus';
import InspecaoPneus from './pages/Inspecao_Pneus';
import DesgastePneu from './pages/Desgaste_Pneu';
import ManutencaoPneus from './pages/Manutencao_Pneus';

// Páginas Administrativas (Admin)
import GerenciarUsuarios from './pages/Gerenciar_Usuarios';
import ConfigAdm from './pages/Config_Adm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Inicial / Login */}
        <Route path="/" element={<Login />} />

        {/* Rotas Comuns / Perfil */}
        <Route path="/perfil" element={<PerfilUsuario />} />

        {/* Rotas Operacionais (Controle de Frotas e Pneus) */}
        <Route path="/c" element={<CadastroUnificado />} />
        <Route path="/caminhao" element={<CadastroCaminhao />} />
        <Route path="/pneu" element={<CadastroPneu />} />
        <Route path="/rodizio" element={<RodizioPneus />} />
        <Route path="/estoque" element={<EstoquePneus />} />
        <Route path="/inspecao" element={<InspecaoPneus />} />
        <Route path="/desgaste" element={<DesgastePneu />} />
        <Route path="/manutencao" element={<ManutencaoPneus />} />

        {/* Rotas Administrativas (Admin) */}
        <Route path="/admin/usuarios" element={<GerenciarUsuarios />} />
        <Route path="/admin/config" element={<ConfigAdm />} />

        {/* Fallback para URLs inválidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;