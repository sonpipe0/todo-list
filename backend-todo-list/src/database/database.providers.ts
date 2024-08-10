import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Todo } from '../todo/todo.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'SONPIPE',
        password: 'ADMIN',
        database: 'TODOLISTDB',
      });
      sequelize.addModels([User, Todo]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
