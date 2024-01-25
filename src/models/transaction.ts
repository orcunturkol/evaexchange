import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'
import { Share } from './share'
import { Portfolio } from './portfolio'

@Table
export class Transaction extends Model<Transaction> {
  @Column({
    type: DataType.ENUM('BUY', 'SELL'),
    allowNull: false
  })
    type!: 'BUY' | 'SELL'

  @ForeignKey(() => Share)
  @Column(DataType.STRING(3))
    shareSymbol!: string

  @ForeignKey(() => Portfolio)
  @Column(DataType.STRING)
    portfolioId!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
    quantity!: number

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
    rate!: number
}
