import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Transaction } from './transaction';

@Table
export class Portfolio extends Model<Portfolio> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true
  })
  id!: string;

  @HasMany(() => Transaction)
  transactions!: Transaction[];
}
