import { Component, inject } from '@angular/core';
import { TodoService } from '../../data-access/todo.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form (submit)="add(); $event.preventDefault()">
      <div>
        <input [formControl]="todoControl" placeholder="Nova tarefa">
        <button type="submit">Criar</button>
      </div>
      @if(todoControl.getError('required') && todoControl.dirty) {
        <span>Nome da tarefa é obrigatório</span>
      } @else if (
        todoControl.getError('minlength') 
        && todoControl.dirty 
        && todoControl.touched
      ) {
        <span>Minimo de 5 caracteres</span>
      }
    </form>
  `,
  styles: `
    span {
      font-size: 12px;
      color: red;
    }
  `
})
export class AddTodoComponent {
  private todoService = inject(TodoService);

  todoControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(5),
    ]
  })

  add() {
    if (this.todoControl.valid) {
      this.todoService.add(this.todoControl.value)
      this.todoControl.reset()
    } else {
      this.todoControl.markAsDirty()
    }
  }
}
