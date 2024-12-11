import { Injectable, computed, signal } from '@angular/core';
import { CreateTodo, DeleteTodo, Todo } from '../@models/todo.model';

@Injectable()
export class TodoService {
  todos = signal<Todo[]>([
    {
      id: 1,
      title: 'Limpar quarto',
      done: true,
    },
    {
      id: 2,
      title: 'Jogar basquete',
      done: false,
    },
    {
      id: 3,
      title: 'Assistir aula da pós',
      done: false,
    },
    {
      id: 4,
      title: 'Acelerar Mustang',
      done: true,
    },
    {
      id: 5,
      title: 'Finalizar objetivos do Q4',
      done: false,
    },
  ]);

  completedTodos = computed(
    () => this.todos().filter((todo) => todo.done).length
  );

  incompleteTodos = computed(
    () => this.todos().length - this.completedTodos()
  );

  add(title: CreateTodo) {
    const lastId = this.todos()[this.todos().length - 1].id;

    this.todos.update((todos) => [...todos, {
      id: lastId + 1,
      title,
      done: false,
    }])
  }

  delete(id: DeleteTodo) {
    this.todos.update((todos) =>
      todos.filter((todo) => todo.id !== id)
    )
  }
}
