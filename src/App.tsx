import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Páginas de Autenticação e Perfil
import Login from './pages/login/Login';
import PerfilUsuario from './pages/perfil/PerfilUsuario';

// Páginas Operacionais / Vida Útil dos Pneus (Cliente / Operador)
import CadastroUnificado from './pages/livre/CadastroUnificado';
import CadastroCaminhao from './pages/livre/Cadastro_Caminhao';
import CadastroPneu from './pages/livre/Cadastro_Pneu';
import RodizioPneus from './pages/livre/Rodizio_Pneus';
import EstoquePneus from './pages/livre/Estoque_Pneus';
import InspecaoPneus from './pages/livre/Inspecao_Pneus';
import DesgastePneu from './pages/livre/Desgaste_Pneu';
import ManutencaoPneus from './pages/livre/Manutencao_Pneus';

import Dashboard from './pages/dashboard/Dashboard';

// Páginas Administrativas (Admin)
import GerenciarUsuarios from './pages/livre/Gerenciar_Usuarios';
import ConfigAdm from './pages/livre/Config_Adm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Inicial / Login */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard"element={<Dashboard />}/>
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