
import styles from '../../css/UsuariosView.module.css';

import {Header,Content} from "./VeiculosView/veiculos";

function VeiculosView() {
  return (
    <div className={styles['container']}>
      <Header />
      <Content />
    </div>
  );
}

export default VeiculosView;
