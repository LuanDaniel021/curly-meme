
import styles from '../css/Dashboard.module.css';

import { useState } from 'react';

function Header() {

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
                U
              </span>

              <span className={styles['profile-name']}>
                Usuário
              </span>

              <span className={styles['profile-arrow']}>
                ▾
              </span>
            </button>

            {menuAberto && (
              <div className={styles['profile-menu']}>

                <a href="/perfil">
                  Meu perfil
                </a>

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
