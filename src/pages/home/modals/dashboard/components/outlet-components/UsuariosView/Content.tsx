
import styles from '../../../css/Usuarios.module.css'
import { Cards } from './Cards'
import TableWrapper, { type MockUser } from './TableWrapper'

interface PContent {
  users: MockUser[];
  onEdit: (user: MockUser) => void;
  onDelete: (user: MockUser) => void;
} 

function Content({ users = [], onEdit, onDelete }: PContent) {
  return (
    <div className={styles['content']}>
      <Cards total={users.length} ativos={users.length} inativos={0} />
      <TableWrapper users={users} onEdit={onEdit} onDelete={onDelete} />

    </div>
  )
}

export default Content;