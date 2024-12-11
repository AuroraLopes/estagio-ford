import { Component, inject } from '@angular/core';
import { TodoService } from '../../data-access/todo.service';
import { TodoItemComponent } from '../../ui/todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { TodoListStatusComponent } from "../../ui/todo-list-status/todo-list-status.component";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, AddTodoComponent, TodoListStatusComponent],
  template: `
    <h1>Lista de tarefas</h1>
    <app-add-todo />
    <app-todo-list-status 
      [completed]="todoService.completedTodos()"
      [incomplete]="todoService.incompleteTodos()" />
    <ul>
      @for (todo of todos(); track todo.id) {
        <app-todo-item 
          [todo]="todo" 
          (deleteTodo)="todoService.delete($event)" 
        />
      }
    </ul>
  `,
  styles: ``,
})
export default class TodoListComponent {
  todoService = inject(TodoService);
  todos = this.todoService.todos;
}
