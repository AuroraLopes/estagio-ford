import { Component, input } from '@angular/core';

@Component({
  selector: 'app-todo-list-status',
  standalone: true,
  imports: [],
  template: `
    {{ completed() }} de {{ incomplete() }} completos!
  `,
  styles: ``,
})
export class TodoListStatusComponent {
  completed = input<number>()
  incomplete = input<number>()
}
