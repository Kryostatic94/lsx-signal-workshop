import { Injectable, signal, computed } from '@angular/core';

/**
 * EXAMPLE 1: Basic Signals
 * 
 * Signals are a new reactive primitive in Angular that:
 * - Replace RxJS for simple state management
 * - Are more performant (granular change detection)
 * - Have a simpler and more intuitive API
 */
@Injectable({
  providedIn: 'root'
})
export class CounterService {
  // Writable signal (can be modified) using native # syntax
  #count = signal(0);
  
  // Expose a read-only version
  readonly count = this.#count.asReadonly();
  
  // Computed signal: automatically updates when #count changes
  readonly doubleCount = computed(() => this.#count() * 2);
  readonly isEven = computed(() => this.#count() % 2 === 0);
  
  increment(): void {
    // update() receives the current value and returns the new value
    this.#count.update(value => value + 1);
  }
  
  decrement(): void {
    this.#count.update(value => value - 1);
  }
  
  reset(): void {
    // set() directly sets a new value
    this.#count.set(0);
  }
  
  setCustomValue(value: number): void {
    this.#count.set(value);
  }
}
