import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [AuthController, TodoController],
  providers: [AuthService, TodoService],
})
export class AppModule {}
