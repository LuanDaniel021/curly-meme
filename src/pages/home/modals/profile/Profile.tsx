
import styles from './css/Profile.module.css';

import { useState } from 'react';
import type { UsuarioAtual } from '../../Home';

interface PerfilUsuarioProp {
  setModalAtivo: () => void;
  usuario: UsuarioAtual;
}

function Header({ setModalAtivo }: Pick<PerfilUsuarioProp, 'setModalAtivo'>) {
  return (
    <header className={styles['profile-header']}>
      <button
        type="button"
        className={styles['back-button']}
        onClick={setModalAtivo}
      >
        ← Voltar ao dashboard
      </button>
    </header>
  )
}

function Banner() {
  return <div className={styles['cover-container']} aria-hidden="true" />
}

function Content({ usuario }: { usuario: UsuarioAtual }) {
  
  const [activeTab, setActiveTab] = useState('atividades');

  return (
      <div className={styles['content-container']}>

        {/* CARTÃO LATERAL DO PERFIL */}
        <aside className={styles['profile-card']}>
          <div className={styles['avatar-wrapper']}>
            <div className={styles['profile-avatar']}>{usuario.nome.slice(0, 2).toUpperCase()}</div>
          </div>

          <div className={styles['user-details']}>
            <h1 className={styles['fullname']}>{usuario.nome}</h1>
            <span className={styles['handle']}>{usuario.email || 'Usuário autenticado'}</span>
            <span className={styles['user-role-badge']}>{usuario.role}</span>
          </div>

          <div className={styles['profile-actions']}>
            <button className={styles['btn-primary']}>✏️ Editar Perfil</button>
            <button className={styles['btn-secondary']} title="Opções">• • •</button>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL COM AS ABAS */}
        <main className={styles['main-content']}>
          <div className={styles['profile-tabs']}>
            <button 
              type="button"
              className={`${styles['tab-item']} ${activeTab === 'atividades' ? styles['active'] : ''}`} 
              onClick={() => setActiveTab('atividades')}
            >
              Atividades
            </button>
            <button 
              type="button"
              className={`${styles['tab-item']} ${activeTab === 'veiculos' ? styles['active'] : ''}`} 
              onClick={() => setActiveTab('veiculos')}
            >
              Veículos
            </button>
            <button 
              type="button"
              className={`${styles['tab-item']} ${activeTab === 'info' ? styles['active'] : ''}`} 
              onClick={() => setActiveTab('info')}
            >
              Info
            </button>
            <button 
              type="button"
              className={`${styles['tab-item']} ${activeTab === 'historico' ? styles['active'] : ''}`} 
              onClick={() => setActiveTab('historico')}
            >
              Histórico
            </button>
          </div>

          <div className={styles['tab-panel']}>
            {activeTab === 'atividades' && (
              <div className={styles['empty-state']}>
                Nenhuma atividade recente registrada para este usuário.
              </div>
            )}

            {activeTab === 'veiculos' && (
              <div className={styles['empty-state']}>
                Nenhum veículo vinculado diretamente.
              </div>
            )}

            {activeTab === 'info' && (
              <div className={styles['empty-state']}>
                Informações do perfil e departamento.
              </div>
            )}

            {activeTab === 'historico' && (
              <div className={styles['empty-state']}>
                Histórico de acessos e movimentações.
              </div>
            )}
          </div>
        </main>

      </div>
  )
}



function PerfilUsuario({ setModalAtivo, usuario }: PerfilUsuarioProp) {
  return (
    <div className={styles['profile']}>

      <Header setModalAtivo={setModalAtivo}/>

      <Banner />
      
      <Content usuario={usuario} />
      
    </div>
  );
}

export default PerfilUsuario;