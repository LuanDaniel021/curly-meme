
import styles from '../../css/Veiculos.module.css';

import Modelo3dView from "./Modelo3dView";

function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['plate-area']}>
        <span className={styles['eyebrow']}>Placa do Veículo</span>
        <div className={styles['plate']}>
          <div className={styles['plate-header']}>
            BR <span>•</span> BRASIL
          </div>
          <input
            type="text"
            placeholder="ABC1D23"
            maxLength={7}
          />
          <span className={styles['plate-country']}>BR</span>
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
