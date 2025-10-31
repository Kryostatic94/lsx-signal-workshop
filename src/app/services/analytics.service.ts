import { Injectable, signal, effect, untracked } from '@angular/core';

export interface AnalyticsEvent {
  type: string;
  timestamp: Date;
  data: any;
}

/**
 * EXAMPLE 3 - ADVANCED: Effects with untracked() and Manual Cleanup
 * 
 * GOAL: Master the use of untracked() and manual cleanup in effects
 * 
 * TASKS:
 * - Implement effects with untracked() to avoid unnecessary dependencies
 * - Manage cleanup of timers and resources
 * - Understand when and how to use these advanced patterns
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  // TODO 3.1: Create signals for tracking events
  // #events = signal<AnalyticsEvent[]>([]);
  // readonly events = this.#events.asReadonly();
  
  // TODO 3.2: Create signals for configuration
  // #enableLogging = signal(true);
  // readonly enableLogging = this.#enableLogging.asReadonly();
  
  // #batchSize = signal(5);
  // readonly batchSize = this.#batchSize.asReadonly();
  
  // #autoSaveInterval = signal(10000); // 10 seconds
  // readonly autoSaveInterval = this.#autoSaveInterval.asReadonly();
  
  constructor() {
    // TODO 3.3: Call methods to configure effects
    // this.#setupLoggingEffect();
    // this.#setupAutoSaveEffect();
  }
  
  /**
   * TODO 3.4: ADVANCED CHALLENGE 1 - Effect with untracked()
   * 
   * GOAL: Implement an effect that:
   * 1. Reruns when #events changes (TRACKED)
   * 2. Reads #enableLogging WITHOUT creating dependency (UNTRACKED)
   * 3. Reads #batchSize WITHOUT creating dependency (UNTRACKED)
   * 
   * WHY? We want to log when events change, but we DON'T want
   * the effect to rerun when we change logging configurations.
   * 
   * IMPLEMENTATION:
   */
  #setupLoggingEffect(): void {
    // TODO: Implement the effect
    // effect(() => {
    //   const events = this.#events(); // TRACKED - creates dependency
    //   
    //   // Use untracked() to read enableLogging without dependency
    //   const loggingEnabled = untracked(() => this.#enableLogging());
    //   
    //   if (loggingEnabled && events.length > 0) {
    //     const lastEvent = events[events.length - 1];
    //     console.log('New event tracked:', lastEvent);
    //     
    //     // Use untracked() for batchSize too
    //     const batchSize = untracked(() => this.#batchSize());
    //     if (events.length % batchSize === 0) {
    //       console.log(`Batch of ${batchSize} events reached!`);
    //     }
    //   }
    // });
  }
  
  /**
   * TODO 3.5: ADVANCED CHALLENGE 2 - Effect with Manual Cleanup
   * 
   * GOAL: Implement an effect that:
   * 1. Creates a setInterval timer that runs periodically
   * 2. Uses untracked() in the timer callback to read events
   * 3. Implements cleanup to cancel the timer when the effect reruns
   * 
   * WHY? Timers must always be cleaned up, otherwise they continue
   * running in the background even when they're no longer needed!
   * 
   * IMPLEMENTATION:
   */
  #setupAutoSaveEffect(): void {
    // TODO: Implement effect with cleanup
    // effect((onCleanup) => {
    //   const interval = this.#autoSaveInterval(); // TRACKED
    //   const enabled = this.#enableLogging(); // TRACKED
    //   
    //   if (!enabled) {
    //     console.log('Auto-save disabled');
    //     return; // Early exit, no timer to create
    //   }
    //   
    //   console.log(`Auto-save configured every ${interval}ms`);
    //   
    //   // Create the timer
    //   const timerId = setInterval(() => {
    //     // IMPORTANT: Use untracked() here to not create dependencies in callback!
    //     const events = untracked(() => this.#events());
    //     
    //     if (events.length > 0) {
    //       console.log(`Auto-save: ${events.length} events saved`);
    //       this.#simulateSaveToServer(events);
    //     }
    //   }, interval);
    //   
    //   // CLEANUP: Cancel the timer when:
    //   // 1. interval or enabled change (before next run)
    //   // 2. The service is destroyed
    //   onCleanup(() => {
    //     console.log('Cleanup: canceling previous timer');
    //     clearInterval(timerId);
    //   });
    // });
  }
  
  /**
   * TODO 3.6: ADVANCED CHALLENGE 3 - Effect with Multiple Cleanups
   * 
   * GOAL: Demonstrate how to manage multiple resources
   * 
   * IMPLEMENTATION:
   */
  setupAdvancedMonitoring(): void {
    // TODO: Implement an effect that manages:
    // - A setTimeout
    // - A setInterval
    // - An event listener (window.addEventListener)
    // And clean up ALL these resources in the cleanup
    
    // effect((onCleanup) => {
    //   const events = this.#events();
    //   const interval = untracked(() => this.#autoSaveInterval());
    //   
    //   console.log('Advanced monitoring activated');
    //   
    //   // Create multiple resources
    //   const timerId = setTimeout(() => {
    //     console.log('Timeout monitoring executed');
    //   }, interval);
    //   
    //   const intervalId = setInterval(() => {
    //     const currentEvents = untracked(() => this.#events());
    //     console.log(`Stats: ${currentEvents.length} total events`);
    //   }, 5000);
    //   
    //   const handleBeforeUnload = () => {
    //     console.log('Page closing, saving data...');
    //   };
    //   window.addEventListener('beforeunload', handleBeforeUnload);
    //   
    //   // Cleanup ALL resources
    //   onCleanup(() => {
    //     console.log('Complete monitoring cleanup');
    //     clearTimeout(timerId);
    //     clearInterval(intervalId);
    //     window.removeEventListener('beforeunload', handleBeforeUnload);
    //   });
    // });
  }
  
  // Public methods already implemented
  trackEvent(type: string, data: any = {}): void {
    const event: AnalyticsEvent = {
      type,
      timestamp: new Date(),
      data
    };
    
    // TODO 3.7: Implement adding the event
    // this.#events.update(events => [...events, event]);
  }
  
  toggleLogging(): void {
    // TODO 3.8: Implement toggling enableLogging
    // this.#enableLogging.update(v => !v);
  }
  
  setBatchSize(size: number): void {
    // TODO 3.9: Implement setting batch size
    // this.#batchSize.set(size);
  }
  
  setAutoSaveInterval(ms: number): void {
    // TODO 3.10: Implement setting interval
    // this.#autoSaveInterval.set(ms);
  }
  
  clearEvents(): void {
    // TODO 3.11: Implement clearing events
    // this.#events.set([]);
  }
  
  #simulateSaveToServer(events: AnalyticsEvent[]): void {
    console.log('Sending data to server...', {
      count: events.length,
      firstEvent: events[0]?.type,
      lastEvent: events[events.length - 1]?.type
    });
  }
}

/**
 * ADVANCED CONCEPTS SUMMARY
 * 
 * 1. untracked():
 *    - Reads a signal WITHOUT creating dependency
 *    - Use when: configurations, avoid loops, async callbacks
 *    - Syntax: untracked(() => this.#signal())
 * 
 * 2. Manual Cleanup:
 *    - Cleans resources when effect reruns or is destroyed
 *    - Use for: timers, subscriptions, event listeners
 *    - Syntax: effect((onCleanup) => { ... onCleanup(() => { ... }) })
 * 
 * 3. Best Practices:
 *    - ALWAYS cleanup timers and subscriptions
 *    - USE untracked() in async callbacks
 *    - AVOID modifying signals you're observing in the effect
 *    - COMBINE untracked() and cleanup for robust effects
 * 
 * WHEN YOU FINISH:
 *    - Test the app and observe logs in console
 *    - Change values and see when effects rerun
 *    - Note that changing enableLogging does NOT retrigger logging effect
 *    - Note that changing interval CLEANS UP previous timer
 */
