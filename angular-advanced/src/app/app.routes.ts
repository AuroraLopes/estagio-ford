import { Routes } from '@angular/router';
import { TodoService } from './todo/data-access/todo.service';

export const routes: Routes = [
  {
    path: 'todo-list',
    loadComponent: () => import('./todo/feature/todo-list/todo-list.component'),
    providers: [TodoService]
  },
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full'
  }
];
