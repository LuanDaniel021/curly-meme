
import styles from '../css/Dashboard.module.css';

import { useState } from 'react';
import type { UsuarioAtual } from '../../../Home';

interface HeaderProp {
  setModalAtivo: () => void;
  usuario: UsuarioAtual;
}

function Header({ setModalAtivo, usuario }: HeaderProp) {

    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <header className={styles['header']}>

          <div className={styles['header-title']}>
            <h1>Dashboard</h1>
            <p>Visão geral da sua frota</p>
          </div>

          <div className={styles['profile-wrapper']}>

            <button
              type="button"
              className={styles['profile-btn']}
              onClick={() => setMenuAberto(!menuAberto)}
              aria-expanded={menuAberto}
            >
              <span className={styles['profile-avatar']}>
                {usuario.nome.slice(0, 2).toUpperCase()}
              </span>

              <span className={styles['profile-name']}>
                {usuario.nome}
              </span>

              <span className={styles['profile-arrow']}>
                ▾
              </span>
            </button>

            {menuAberto && (
              <div className={styles['profile-menu']}>
                
                <button
                  type='button'
                  onClick={setModalAtivo}
                >
                  Meu perfil
                </button>

                <button type="button">
                  Sair
                </button>

              </div>
            )}

          </div>

        </header>
    );

}

export default Header;
