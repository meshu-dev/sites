import styles from './EnvRow.module.scss'
import Button from '@mui/material/Button'
import { Category } from '@/app/types'

type Props = {
  category: Category,
  onEditFtn: (categoryId: number | undefined) => void,
  onDeleteFtn: (categoryId: number | undefined) => void
}

const EnvRow = ({ category, onEditFtn, onDeleteFtn }: Props) => {
  return (
    <div className={ styles['env-row'] }>
      <div className={ styles['env-row-name'] }>{ category['name'] }</div>
      <Button
        className={ styles['env-row-link'] }
        onClick={ () => onEditFtn(category.id) }>
          Edit
      </Button>
      <Button
        className={ styles['env-row-link'] }
        onClick={ () => onDeleteFtn(category.id) }>
          Delete
      </Button>
    </div>
  )
}

export default EnvRow