import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request } from 'express';

type TodoInfoType = {
  userId: string;
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

  @Post('change-date')
  changeDate(
    @Body() todoInfo: { todoId: string; newDate: string },
    @Req() request: Request,
  ) {
    // @ts-expect-error request-user-injection-not-detected
    const userId = request.user?.userId;
    const newDate = new Date(todoInfo.newDate);
    return this.todoService.changeDate(todoInfo.todoId, userId, newDate);
  }

  @Post('mark-done')
  markDone(@Body() info: { todoId: string }, @Req() request: Request) {
    // @ts-expect-error request-user-injection-not-detected
    const userId = request.user?.userId;

    return this.todoService.changeTodoStatus(info.todoId, userId);
  }

  @Post('delete')
  delete(@Body() info: { todoId: string }, @Req() request: Request) {
    // @ts-expect-error request-user-injection-not-detected
    const userId = request.user?.userId;
    return this.todoService.deleteTodo(info.todoId, userId);
  }
}
