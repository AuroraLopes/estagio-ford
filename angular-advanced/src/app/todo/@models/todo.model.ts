export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export type CreateTodo = Todo['title']
export type DeleteTodo = Todo['id']
export type EditTodo = Pick<Todo, 'id' | 'title'>