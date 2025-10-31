import { Injectable, signal, computed } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * EXAMPLE 2: Signals with Complex Data Structures
 *
 * When using signals with arrays or objects:
 * - We must create new instances to trigger the change
 * - Computed signals can derive complex data
 * - We can compose multiple signals
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Signal containing an array of todos using native # syntax
  #todos = signal<Todo[]>([]);

  // Computed signals for statistics
  readonly totalTodos = computed(() => this.#todos().length);
  readonly completedTodos = computed(() =>
    this.#todos().filter(todo => todo.completed).length
  );
  readonly activeTodos = computed(() =>
    this.#todos().filter(todo => !todo.completed).length
  );
  readonly completionPercentage = computed(() => {
    const total = this.totalTodos();
    if (total === 0) return 0;
    return Math.round((this.completedTodos() / total) * 100);
  });

  // Computed signal for filtering
  readonly sortedTodos = computed(() =>
    [...this.#todos()].sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    )
  );

  #nextId = 1;

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: this.#nextId++,
      title,
      completed: false,
      createdAt: new Date()
    };

    // IMPORTANT: Create a new array to trigger the signal
    this.#todos.update(todos => [...todos, newTodo]);
  }

  toggleTodo(id: number): void {
    this.#todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  deleteTodo(id: number): void {
    this.#todos.update(todos =>
      todos.filter(todo => todo.id !== id)
    );
  }

  clearCompleted(): void {
    this.#todos.update(todos =>
      todos.filter(todo => !todo.completed)
    );
  }

  loadSampleData(): void {
    this.#todos.set([
      {
        id: this.#nextId++,
        title: 'Learn Signals in Angular',
        completed: true,
        createdAt: new Date(Date.now() - 3600000)
      },
      {
        id: this.#nextId++,
        title: 'Understand computed() and effect()',
        completed: false,
        createdAt: new Date(Date.now() - 1800000)
      },
      {
        id: this.#nextId++,
        title: 'Implement untracked() in effects',
        completed: false,
        createdAt: new Date()
      }
    ]);
  }
}
