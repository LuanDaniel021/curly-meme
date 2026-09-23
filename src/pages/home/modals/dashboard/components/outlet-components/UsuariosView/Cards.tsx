
import styles from '../../../css/Usuarios.module.css'

interface Card {
    titulo: string
    valor: number
}

export function Card({ titulo, valor }: Card) {
  return (
    <div className={styles['card']}>
      <span className={styles['card-title']}>{titulo}</span>
      <span className={styles['card-value']}>{valor}</span>
    </div>
  )
}

export function Cards({ total = 0, ativos = 0, inativos = 0 }) {
  return (
    <div className={styles['cards-grid']}>
      <Card titulo="Total de Usuários" valor={total} />
      <Card titulo="Ativos" valor={ativos} />
      <Card titulo="Inativos" valor={inativos} />
    </div>
  )
}
