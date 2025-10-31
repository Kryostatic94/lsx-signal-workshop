import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../services/counter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>EXAMPLE 1: Basic Signals</h2>
      
      <div class="counter-display">
        <h3>Counter: {{ counterService.count() }}</h3>
        <p>Double: {{ counterService.doubleCount() }}</p>
        <p>Is Even? {{ counterService.isEven() ? 'Yes' : 'No' }}</p>
      </div>
      
      <div class="button-group">
        <button (click)="counterService.decrement()">- Decrement</button>
        <button (click)="counterService.increment()">+ Increment</button>
        <button (click)="counterService.reset()">Reset</button>
      </div>
      
      <div class="custom-value">
        <input 
          type="number" 
          [(ngModel)]="customValue" 
          placeholder="Custom value"
        />
        <button (click)="setCustomValue()">Set Value</button>
      </div>
      
      <div class="explanation">
        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>signal()</strong>: creates a writable signal</li>
          <li><strong>asReadonly()</strong>: exposes read-only version</li>
          <li><strong>computed()</strong>: automatically calculates derived values</li>
          <li><strong>update()</strong>: modifies based on previous value</li>
          <li><strong>set()</strong>: directly sets a new value</li>
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
    
    .counter-display {
      text-align: center;
      margin: 20px 0;
      padding: 20px;
      background: #f0f0f0;
      border-radius: 8px;
    }
    
    .counter-display h3 {
      font-size: 2em;
      margin: 0;
      color: #2196F3;
    }
    
    .button-group {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 20px 0;
    }
    
    .custom-value {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 20px 0;
    }
    
    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 150px;
    }
    
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background: #2196F3;
      color: white;
      cursor: pointer;
      font-weight: bold;
    }
    
    button:hover {
      background: #1976D2;
    }
    
    .explanation {
      margin-top: 20px;
      padding: 15px;
      background: #e3f2fd;
      border-radius: 4px;
      border-left: 4px solid #2196F3;
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
export class CounterComponent {
  counterService = inject(CounterService);
  customValue = 0;
  
  setCustomValue(): void {
    this.counterService.setCustomValue(this.customValue);
  }
}
