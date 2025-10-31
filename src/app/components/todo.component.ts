import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';

/*@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>EXAMPLE 2: Signals with Complex Structures</h2>

      <div class="stats">
        <div class="stat-item">
          <strong>Total:</strong> {{ todoService.totalTodos() }}
        </div>
        <div class="stat-item">
          <strong>Completed:</strong> {{ todoService.completedTodos() }}
        </div>
        <div class="stat-item">
          <strong>Active:</strong> {{ todoService.activeTodos() }}
        </div>
        <div class="stat-item">
          <strong>Progress:</strong> {{ todoService.completionPercentage() }}%
        </div>
      </div>

      <div class="progress-bar">
        <div
          class="progress-fill"
          [style.width.%]="todoService.completionPercentage()"
        ></div>
      </div>

      <div class="add-todo">
        <input
          type="text"
          [(ngModel)]="newTodoTitle"
          (keyup.enter)="addTodo()"
          placeholder="Add a new todo..."
        />
        <button (click)="addTodo()">+ Add</button>
      </div>

      <div class="todo-list">
        @for (todo of todoService.sortedTodos(); track todo.id) {
          <div class="todo-item" [class.completed]="todo.completed">
            <input
              type="checkbox"
              [checked]="todo.completed"
              (change)="todoService.toggleTodo(todo.id)"
            />
            <span class="todo-title">{{ todo.title }}</span>
            <span class="todo-date">
              {{ todo.createdAt | date:'short' }}
            </span>
            <button
              class="delete-btn"
              (click)="todoService.deleteTodo(todo.id)"
            >
              Delete
            </button>
          </div>
        } @empty {
          <p class="empty-state">No todos yet. Add one!</p>
        }
      </div>

      <div class="actions">
        <button (click)="todoService.loadSampleData()">
          Load Sample Data
        </button>
        <button (click)="todoService.clearCompleted()">
          Clear Completed
        </button>
      </div>

      <div class="explanation">
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>Immutability</strong>: create new arrays/objects to trigger signals</li>
          <li><strong>Derived computed</strong>: statistics calculated automatically</li>
          <li><strong>Composition</strong>: computed that depend on other computed</li>
          <li><strong>Performance</strong>: Angular updates only what changes</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }

    .stat-item {
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
      text-align: center;
    }

    .progress-bar {
      height: 30px;
      background: #e0e0e0;
      border-radius: 15px;
      overflow: hidden;
      margin: 20px 0;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4CAF50, #8BC34A);
      transition: width 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }

    .add-todo {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }

    .add-todo input {
      flex: 1;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    .add-todo input:focus {
      outline: none;
      border-color: #4CAF50;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background: #4CAF50;
      color: white;
      cursor: pointer;
      font-weight: bold;
      white-space: nowrap;
    }

    button:hover {
      background: #45a049;
    }

    .todo-list {
      margin: 20px 0;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 4px;
      margin-bottom: 10px;
      transition: all 0.3s ease;
    }

    .todo-item:hover {
      background: #f0f0f0;
      transform: translateX(5px);
    }

    .todo-item.completed {
      opacity: 0.6;
    }

    .todo-item.completed .todo-title {
      text-decoration: line-through;
      color: #888;
    }

    .todo-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .todo-title {
      flex: 1;
      font-size: 16px;
    }

    .todo-date {
      font-size: 12px;
      color: #888;
    }

    .delete-btn {
      background: #f44336;
      padding: 5px 10px;
      font-size: 14px;
    }

    .delete-btn:hover {
      background: #da190b;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #888;
      font-size: 18px;
    }

    .actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 20px 0;
    }

    .explanation {
      margin-top: 20px;
      padding: 15px;
      background: #e8f5e9;
      border-radius: 4px;
      border-left: 4px solid #4CAF50;
    }

    .explanation h4 {
      margin-top: 0;
    }

    .explanation ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .explanation li {
      margin: 5px 0;
    }
  `]
})
export class TodoComponent {
  todoService = inject(TodoService);
  newTodoTitle = '';

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }
}*/
