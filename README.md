# Angular Signals - Complete Guide

A practical and complete guide to using Signals in Angular, with progressive examples from basic concepts to advanced patterns.

## Project Structure

The project is organized into 3 progressive difficulty levels:

### Example 1: Basic Signals
**Files:** `counter.service.ts` + `counter.component.ts`

Concepts covered:
- `signal()` - Create writable signals
- `asReadonly()` - Expose read-only versions
- `computed()` - Automatically calculate derived values
- `update()` - Modify based on previous value
- `set()` - Directly set a new value

### Example 2: Complex Structures
**Files:** `todo.service.ts` + `todo.component.ts`

Concepts covered:
- Managing arrays and objects in signals
- Immutability: creating new instances to trigger signals
- Complex computed signals and composition
- Automatically deriving statistics and filters
- Performance: granular change detection

### Example 3: ADVANCED - Effects
**Files:** `analytics.service.ts` + `analytics.component.ts`

Concepts covered:
- **untracked()**: reading signals without creating dependencies
- **Manual cleanup**: managing timers, subscriptions and resources
- **Best practices** to avoid infinite loops
- **Composition** of complex effects

## Why Signals?

Signals represent a new reactive primitive in Angular that offers:

1. **Performance**: Granular change detection (updates only what changes)
2. **Simplicity**: More intuitive API compared to RxJS for local state
3. **Type Safety**: Fully type-safe with TypeScript
4. **Composability**: Easy to compose and derive data
5. **Debugging**: Easier to trace and debug data flow

## Key Concepts

### Writable vs Readonly Signal
```typescript
// Writable (private in service) using # syntax
#count = signal(0);

// Readonly (publicly exposed)
readonly count = this.#count.asReadonly();
```

### Computed Signals
Computed signals automatically recalculate when the signals they depend on change:

```typescript
readonly doubleCount = computed(() => this.#count() * 2);
readonly isEven = computed(() => this.#count() % 2 === 0);
```

### Effects
Effects execute side-effects when signals change:

```typescript
effect(() => {
  const count = this.#count(); // Creates dependency
  console.log('Count changed:', count);
});
```

### untracked() - ADVANCED LEVEL
Read a signal WITHOUT creating a dependency:

```typescript
effect(() => {
  const events = this.#events(); // TRACKED
  
  // untracked: won't retrigger effect if it changes
  const config = untracked(() => this.#config());
  
  if (config.enabled) {
    processEvents(events);
  }
});
```

**When to use untracked()**:
- Read configurations that shouldn't retrigger the effect
- Avoid infinite loops
- Optimize performance
- Access accessory data in callbacks

### Manual Cleanup - ADVANCED LEVEL
Clean up resources when the effect is re-executed or destroyed:

```typescript
effect((onCleanup) => {
  const interval = this.#interval();
  
  // Create a resource
  const timerId = setInterval(() => {
    console.log('Tick');
  }, interval);
  
  // Cleanup: called before next run or on destruction
  onCleanup(() => {
    clearInterval(timerId);
  });
});
```

**When to use cleanup**:
- Timers (setTimeout, setInterval)
- Subscriptions (RxJS, WebSocket)
- Event listeners
- Resources that must be freed

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:4200 and the browser console
```

## How to Study this Project

1. **Start with Basics**: Study `counter.service.ts`
2. **Move to Intermediate**: Analyze `todo.service.ts`
3. **Face the Advanced**: Deep dive into `analytics.service.ts`
4. **Open the Console**: Observe logs to see effects in action
5. **Modify and Experiment**: Change values and see what happens

## Student Exercises

After studying the services, try to:

1. Add a new computed signal in CounterService
2. Implement a filter for todos (all/active/completed)
3. Create a new effect in AnalyticsService with cleanup
4. Use untracked() to avoid an unnecessary re-trigger
5. Compose multiple signals to create complex dashboards

## Useful Resources

- [Angular Signals Documentation](https://angular.dev/guide/signals)
- [Angular Blog - Introducing Signals](https://blog.angular.io/introducing-angular-signals-4ca2b3f4d0e8)
- [Best Practices for Signals](https://angular.dev/guide/signals#best-practices)

## Important Notes

### Immutability with Arrays and Objects
```typescript
// WRONG - doesn't trigger the signal
this.#todos().push(newTodo);

// CORRECT - creates new array
this.#todos.update(todos => [...todos, newTodo]);
```

### Avoiding Infinite Loops
```typescript
// WRONG - infinite loop!
effect(() => {
  const count = this.#count();
  this.#count.set(count + 1); // Modifies what it's observing!
});

// CORRECT - use untracked if necessary
effect(() => {
  const config = this.#config();
  const currentCount = untracked(() => this.#count());
  console.log('Config changed, current count:', currentCount);
});
```

## Completion Certificate

You have completed the guide when you can:
- [ ] Explain the difference between signal() and computed()
- [ ] Implement a service with signals
- [ ] Use update() and set() appropriately
- [ ] Create composite computed signals
- [ ] Use effect() for side-effects
- [ ] Implement untracked() correctly
- [ ] Manage cleanup in effects
- [ ] Avoid infinite loops

## Contributions

This project is intended for educational purposes. Feel free to:
- Add new examples
- Improve documentation
- Report errors
- Share with other students

## License

Educational project - Free for use in educational contexts

---

**Happy studying!**
