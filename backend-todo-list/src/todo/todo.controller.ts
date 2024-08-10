import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TodoService } from './todo.service';

type TodoInfoType = {
  name: string;
  description: string;
  dueDate: Date;
};

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  // @ts-expect-error request-user-injection-not-detected
  createTodo(@Body() todoInfo: TodoInfoType, @Req() request) {
    const userId = request.user?.userId;

    return this.todoService.createTodo(
      todoInfo.name,
      todoInfo.description,
      todoInfo.dueDate,
      userId,
    );
  }

  @Get('get-all')
  // @ts-expect-error request-user-injection-not-detected
  getTodos(@Req() request) {
    const userId = request.user?.userId;

    return this.todoService.getTodos(userId);
  }
}
