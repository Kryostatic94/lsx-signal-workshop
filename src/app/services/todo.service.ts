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
 * GOAL: Manage complex arrays with signals and create derived statistics
 * 
 * TASKS:
 * - Create a signal with array of todos
 * - Implement computed signals for statistics
 * - Handle array immutability
 * - Create CRUD operations on todos
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // TODO 2.1: Create a private #todos signal containing an empty Todo array
  // Hint: #todos = signal<Todo[]>([]);
  
  // TODO 2.2: Expose a read-only version of todos
  // Hint: readonly todos = this.#todos.asReadonly();
  
  // TODO 2.3: Create a computed signal that counts the total number of todos
  // Hint: readonly totalTodos = computed(() => this.#todos().length);
  
  // TODO 2.4: Create a computed signal that counts how many todos are completed
  // Hint: readonly completedTodos = computed(() => 
  //   this.#todos().filter(todo => todo.completed).length
  // );
  
  // TODO 2.5: Create a computed signal that counts how many todos are active (not completed)
  
  // TODO 2.6: Create a computed signal that calculates the completion percentage
  // Hint: computed with logic that divides completedTodos / totalTodos * 100
  // Attention: handle the case when totalTodos === 0
  
  // TODO 2.7: Create a computed signal that sorts todos by creation date (newest first)
  // Hint: readonly sortedTodos = computed(() => 
  //   [...this.#todos()].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  // );
  
  #nextId = 1;
  
  addTodo(title: string): void {
    const newTodo: Todo = {
      id: this.#nextId++,
      title,
      completed: false,
      createdAt: new Date()
    };
    
    // TODO 2.8: Use update() to add the newTodo to the array
    // IMPORTANT: Create a NEW array with spread operator to maintain immutability
    // Hint: this.#todos.update(todos => [...todos, newTodo]);
  }
  
  toggleTodo(id: number): void {
    // TODO 2.9: Use update() to toggle the completed state of the todo with the specified id
    // IMPORTANT: Use map() and create new objects to maintain immutability
    // Hint: this.#todos.update(todos => 
    //   todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    // );
  }
  
  deleteTodo(id: number): void {
    // TODO 2.10: Use update() to remove the todo with the specified id
    // Hint: use filter()
  }
  
  clearCompleted(): void {
    // TODO 2.11: Use update() to remove all completed todos
    // Hint: filter only todos with completed === false
  }
  
  loadSampleData(): void {
    // TODO 2.12: Use set() to load this sample data
    const sampleData: Todo[] = [
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
    ];
    
    // TODO: Implement data loading here
  }
}
