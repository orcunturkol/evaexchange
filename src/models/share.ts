import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Share extends Model<Share> {
  @Column({
    type: DataType.STRING(3),
    allowNull: false,
    primaryKey: true,
    validate: {
      isUppercase: true,
      len: [3, 3]
    }
  })
  symbol!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  price!: number;
}
