
import plateStyles from '../../css/Veiculos.module.css';
import viewStyles from '../../css/VeiculosView.module.css';

import { Content, Header } from './VeiculosView/veiculos';
import Modelo3dView from './VeiculosView/Modelo3dView';

function PlateHeader() {
  return (
    <section className={plateStyles['header']}>
      <div className={plateStyles['plate-area']}>
        <span className={plateStyles['eyebrow']}>Placa do Veículo</span>
        <div className={plateStyles['plate']}>
          <div className={plateStyles['plate-header']}>
            BR <span>•</span> BRASIL
          </div>
          <input
            type="text"
            placeholder="ABC1D23"
            maxLength={7}
          />
          <span className={plateStyles['plate-country']}>BR</span>
        </div>
      </div>
    </section>
  );
}

function Veiculos() {
  return (
    <div className={viewStyles['container']}>
      <Header />
      <Content veiculos={[]} />
    </div>
  );
}

export function Veiculos3dView() {
  return (
    <div className={plateStyles['container']}>
      <PlateHeader />
      <div className={plateStyles['render']}>
        <Modelo3dView />
      </div>
    </div>
  );
}

export default Veiculos;
