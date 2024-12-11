import { Component, Input, input, output } from '@angular/core';
import { DeleteTodo, Todo } from '../../@models/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <input type="checkbox" [(ngModel)]="todo().done" />
      <h2>{{ todo().title }}</h2>
      <span (click)="deleteTodo.emit(todo().id)">❌</span>
    </div>
  `,
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  todo = input.required<Todo>()
  deleteTodo = output<DeleteTodo>()
}
