
import { Header, Content } from './pneus/components/user';

import styles from '../../css/PneusView.module.css'

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
