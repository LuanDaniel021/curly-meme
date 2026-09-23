
import styles from '../../css/Veiculos.module.css';

import Modelo3dView from "./Modelo3dView";

function Header() {
    return (
        <header className={styles['header']}>
            TESTE
        </header>
    )
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
