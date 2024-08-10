import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { uuid } from 'uuidv4';
import { User } from '../users/users.model';

@Table({
  timestamps: false,
})
export class Todo extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: uuid(),
    primaryKey: true,
    unique: true,
  })
  todoId: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  dueDate: Date;

  @Column
  done: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
