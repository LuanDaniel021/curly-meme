
import styles from '../../css/Veiculos.module.css';

import Modelo3dView from "./Modelo3dView";

import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.plateArea}>
        <span className={styles.eyebrow}>Placa do Veículo</span>
        <div className={styles.plate}>
          <div className={styles.plateHeader}>
            BR <span>•</span> BRASIL
          </div>
          <input
            type="text"
            placeholder="ABC1D23"
            maxLength={7}
          />
          <span className={styles.plateCountry}>BR</span>
        </div>
      </div>
    </header>
  );
}


function Render() {
    return (
        <div className={styles['render']}>
            <Modelo3dView />
        </div>
    )
}

function Veiculos() {
    return (
        <div className={styles['container']}>

            <Header />

            <Render />

        </div>
    )
}

export default Veiculos;
