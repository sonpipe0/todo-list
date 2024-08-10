import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { uuid } from 'uuidv4';
import { Todo } from '../todo/todo.model';

@Table({
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: uuid(),
    primaryKey: true,
    unique: true,
  })
  userId: string;

  @Column
  username: string;

  @Column
  name: string;

  @Column
  lastname: string;

  @Column
  hash: string;

  @Column
  salt: string;

  @HasMany(() => Todo)
  todos: Todo[];
}
