import { HttpException, Injectable } from '@nestjs/common';
import { Todo } from './todo.model';


type TodoDTO = {
  todoId: string;
  title: string;
  description: string;
  dueDate: Date;
  done: boolean;
};

@Injectable()
export class TodoService {
  constructor() {
  }

  async createTodo(
    name: string,
    description: string,
    dueDate: Date,
    userId: string,
  ) {
    //check if user has already created a todo with the same name

    const todo: Todo | null = await Todo.findOne({
      where: { title: name, userId: userId },
    });

    if (todo) {
      throw new HttpException('Todo with the same name already exists', 400);
    }

    const newTodo: Todo = new Todo();
    newTodo.title = name;
    newTodo.description = description;
    newTodo.dueDate = dueDate;
    newTodo.userId = userId;
    newTodo.done = false;


    await newTodo.save();
    const result: TodoDTO = {
      todoId: newTodo.todoId,
      title: newTodo.title,
      description: newTodo.description,
      dueDate: newTodo.dueDate,
      done: newTodo.done,
    };
    return result;

  }

  async getTodos(userId: string) {
    const todos: Todo[] = await Todo.findAll({
      where: { userId: userId },
      order: [['dueDate', 'ASC'], ['done', 'ASC']],
    });
    const todosDtos: TodoDTO[] = todos.map((todo) => {
      return {
        todoId: todo.todoId,
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        done: todo.done,
      };
    });

    return todosDtos;
  }
}
