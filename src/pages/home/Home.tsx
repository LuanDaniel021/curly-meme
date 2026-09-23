
import { useEffect, useState } from "react";
import Dashboard from "./modals/dashboard/Dashboard";
import Profile from "./modals/profile/Profile";
import { api } from '../../service/api';

export interface UsuarioAtual {
    nome: string;
    email: string;
    role: string;
}

const usuarioInicial: UsuarioAtual = {
    nome: 'Usuário',
    email: '',
    role: 'Usuário',
};

function Home() {

    const [modalAtivo, setModalAtivo] = useState('dashboard');
    const [usuario, setUsuario] = useState<UsuarioAtual>(usuarioInicial);

    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const response = await api.get('users/info');
                const dados = response && typeof response === 'object' && 'data' in response
                    ? response.data
                    : response;

                if (dados && typeof dados === 'object') {
                    const perfil = dados as Partial<UsuarioAtual>;
                    setUsuario({
                        nome: perfil.nome || usuarioInicial.nome,
                        email: perfil.email || usuarioInicial.email,
                        role: perfil.role || usuarioInicial.role,
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);
            }
        };

        carregarUsuario();
    }, []);

    const handler = () => {
        switch (modalAtivo) {
            case 'profile': return <Profile
                usuario={usuario}
                setModalAtivo={() => setModalAtivo('dashboard')}
            />
            default : return <Dashboard
                usuario={usuario}
                setModalAtivo={() => setModalAtivo('profile')}
            />
        }
    }

    return (
        handler()
    )
}

export default Home;