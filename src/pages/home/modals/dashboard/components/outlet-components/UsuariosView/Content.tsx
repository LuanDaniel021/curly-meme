
import styles from '../../../css/Usuarios.module.css'
import { Cards } from './Cards'
import TableWrapper, { type MockUser } from './TableWrapper'

interface PContent {
  users: MockUser[] 
} 

function Content({ users = [] }: PContent) {
  return (
    <div className={styles['content']}>
      <Cards total={users.length} ativos={users.length} inativos={0} />
      <TableWrapper users={users} />

    </div>
  )
}

export default Content;