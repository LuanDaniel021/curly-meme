
import styles from '../../../css/Usuarios.module.css'

function Header() {
  return (
    <header className={styles['header']}>
      <div>
        <h1 className={styles['title']}>Gestão de Usuários</h1>
        <p className={styles['subtitle']}>Gerencie permissões, perfis e acessos do sistema.</p>
      </div>

      <button className={styles['btn-create']}>
        <span>➕</span> Criar Usuário
      </button>
    </header>
  )
}

export default Header;
