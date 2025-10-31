# Angular Signals - Student Exercises

Welcome! This is a practice project to learn Signals in Angular.

## Goal

Complete the TODOs in the 3 services to learn:
1. **Basic Signals** (counter.service.ts)
2. **Signals with Complex Structures** (todo.service.ts)  
3. **Advanced Effects** (analytics.service.ts)

## How to Proceed

### Step 1: Setup
```bash
npm install
npm start
```

### Step 2: Open the Files
Work on files in this order:
1. `src/app/services/counter.service.ts` - 8 TODOs
2. `src/app/services/todo.service.ts` - 12 TODOs
3. `src/app/services/analytics.service.ts` - 11 TODOs (ADVANCED)

### Step 3: Follow the TODOs
Each file has `TODO X.Y` comments with:
- What to implement
- Hints
- Concept explanations

### Step 4: Test
After completing each TODO:
- Save the file
- Check the browser (http://localhost:4200)
- Verify the console for logs (especially in Advanced!)

## Progress Tracker

### Example 1: Counter Service (Basic)
- [ ] TODO 1.1 - Create #count signal
- [ ] TODO 1.2 - Expose readonly count
- [ ] TODO 1.3 - Computed doubleCount
- [ ] TODO 1.4 - Computed isEven
- [ ] TODO 1.5 - Implement increment()
- [ ] TODO 1.6 - Implement decrement()
- [ ] TODO 1.7 - Implement reset()
- [ ] TODO 1.8 - Implement setCustomValue()

### Example 2: Todo Service (Intermediate)
- [ ] TODO 2.1 - Create #todos signal
- [ ] TODO 2.2 - Expose readonly todos
- [ ] TODO 2.3 - Computed totalTodos
- [ ] TODO 2.4 - Computed completedTodos
- [ ] TODO 2.5 - Computed activeTodos
- [ ] TODO 2.6 - Computed completionPercentage
- [ ] TODO 2.7 - Computed sortedTodos
- [ ] TODO 2.8 - Implement addTodo()
- [ ] TODO 2.9 - Implement toggleTodo()
- [ ] TODO 2.10 - Implement deleteTodo()
- [ ] TODO 2.11 - Implement clearCompleted()
- [ ] TODO 2.12 - Implement loadSampleData()

### Example 3: Analytics Service (ADVANCED)
- [ ] TODO 3.1 - Create signals for events
- [ ] TODO 3.2 - Create signals for configuration
- [ ] TODO 3.3 - Call setup effects in constructor
- [ ] TODO 3.4 - Implement #setupLoggingEffect() with untracked()
- [ ] TODO 3.5 - Implement #setupAutoSaveEffect() with cleanup
- [ ] TODO 3.6 - Implement setupAdvancedMonitoring()
- [ ] TODO 3.7 - Implement trackEvent()
- [ ] TODO 3.8 - Implement toggleLogging()
- [ ] TODO 3.9 - Implement setBatchSize()
- [ ] TODO 3.10 - Implement setAutoSaveInterval()
- [ ] TODO 3.11 - Implement clearEvents()

## Key Hints

### Basic Signals
```typescript
// Create
const mySignal = signal(initialValue);

// Read
const value = mySignal();

// Modify
mySignal.set(newValue);
mySignal.update(old => old + 1);
```

### Computed Signals
```typescript
const computed = computed(() => {
  return mySignal() * 2; // Recalculates automatically
});
```

### Effects
```typescript
// Basic
effect(() => {
  const value = mySignal(); // Creates dependency
  console.log(value);
});

// With untracked
effect(() => {
  const tracked = mySignal(); // Dependency
  const untracked = untracked(() => anotherSignal()); // NO dependency
});

// With cleanup
effect((onCleanup) => {
  const timer = setInterval(() => {}, 1000);
  onCleanup(() => clearInterval(timer));
});
```

### Immutability with Arrays
```typescript
// WRONG
myArray().push(item);

// CORRECT
myArray.update(arr => [...arr, item]);
myArray.update(arr => arr.filter(x => x.id !== id));
myArray.update(arr => arr.map(x => x.id === id ? {...x, changed: true} : x));
```

## Need Help?

### Check First:
1. Comments in files with hints
2. Main project README.md
3. Browser console for errors

### Compare with Solution:
- Complete solution is in the `angular-signals-SOLUTION.zip` file
- Use it ONLY after trying yourself!

### Online Resources:
- [Angular Signals Docs](https://angular.dev/guide/signals)
- [computed() reference](https://angular.dev/api/core/computed)
- [effect() reference](https://angular.dev/api/core/effect)

## How to Verify Understanding

You have successfully completed when:

### Example 1 (Counter):
- Counter increments/decrements
- Double value updates automatically
- Even/odd check works
- You can set custom values

### Example 2 (Todo):
- You can add/remove todos
- Statistics update automatically
- Completion percentage is correct
- Todos are sorted correctly

### Example 3 (Analytics - ADVANCED):
- Events are tracked and logged
- Disabling logging does NOT retrigger logging effect
- Changing interval cancels previous timer
- Auto-save works periodically
- Logs appear in console

## Completion Certificate

Once you complete ALL TODOs, you're ready to:
- Use signals in your Angular projects
- Optimize performance with computed signals
- Implement complex effects with untracked and cleanup
- Manage reactive state professionally

## Extra Challenges (Optional)

After completing all TODOs, try to:
1. Add a filter to todos (all/active/completed)
2. Persist todos in localStorage
3. Create a new service with signals for form management
4. Implement undo/redo with signals

Happy studying!
