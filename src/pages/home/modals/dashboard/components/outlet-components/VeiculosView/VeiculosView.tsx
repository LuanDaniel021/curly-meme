
import styles from '../../css/VeiculosView.module.css';

import {Header,Content} from "./veiculos";

function VeiculosView() {
  return (
    <div className={styles['container']}>
      <Header />
      <Content />
    </div>
  );
}

export default VeiculosView;
