
import { Header, Content } from './PneusView/user';

import styles from '../../css/Pneus.module.css'

function PneusView()
{
    return (
        <div className={styles['container']}>
            <Header />
            <Content />
        </div>
    )
}

export default PneusView;
