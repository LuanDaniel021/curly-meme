import './App.css'

import CadastroCaminhao from './pages/Cadastro_Caminhao.tsx'
import CadastroUnificado from './pages/CadastroUnificado.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/c" element={<CadastroUnificado />} />
        <Route path="/caminhao" element={<CadastroCaminhao />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

