import styles from './PerfilUsuario.module.css';
import { useState } from 'react';

function PerfilUsuario() {
  const [activeTab, setActiveTab] = useState('atividades');

  return (
    <div className={styles['page-container']}>

      {/* BANNER / CAPA */}
      <div className={styles['cover-container']}></div>

      {/* GRID DE CONTEÚDO */}
      <div className={styles['content-container']}>
        
        {/* CARTÃO LATERAL DO PERFIL */}
        <aside className={styles['profile-card']}>
          <div className={styles['avatar-wrapper']}>
            <div className={styles['profile-avatar']}>CE</div>
          </div>

          <div className={styles['user-details']}>
            <h1 className={styles['fullname']}>CARLOS EDUARDO</h1>
            <span className={styles['handle']}>@carlos.eduardo</span>
            <span className={styles['user-role-badge']}>Supervisão de Logística</span>
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
    </div>
  );
}

export default PerfilUsuario;