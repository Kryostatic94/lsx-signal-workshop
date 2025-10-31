import { Injectable, signal, computed } from '@angular/core';

/**
 * EXAMPLE 1: Basic Signals
 * 
 * GOAL: Implement a service with basic signals
 * 
 * TASKS:
 * - Create a writable signal for the counter
 * - Expose a read-only version
 * - Create computed signals for derived values
 * - Implement methods to modify the signal
 */
@Injectable({
  providedIn: 'root'
})
export class CounterService {
  // TODO 1.1: Create a private writable signal called #count initialized to 0
  // Hint: #count = signal(0);
  
  // TODO 1.2: Expose a read-only version of count
  // Hint: readonly count = this.#count.asReadonly();
  
  // TODO 1.3: Create a computed signal that returns double the count
  // Hint: readonly doubleCount = computed(() => this.#count() * 2);
  
  // TODO 1.4: Create a computed signal that checks if count is even
  // Hint: readonly isEven = computed(() => this.#count() % 2 === 0);
  
  increment(): void {
    // TODO 1.5: Use update() to increment the value by 1
    // Hint: this.#count.update(value => value + 1);
  }
  
  decrement(): void {
    // TODO 1.6: Use update() to decrement the value by 1
  }
  
  reset(): void {
    // TODO 1.7: Use set() to reset the value to 0
    // Hint: this.#count.set(0);
  }
  
  setCustomValue(value: number): void {
    // TODO 1.8: Use set() to set a custom value
  }
}
