import { Injectable, signal, effect, untracked } from '@angular/core';

export interface AnalyticsEvent {
  type: string;
  timestamp: Date;
  data: any;
}

/**
 * EXAMPLE 3 - ADVANCED: Effects with untracked() and Manual Cleanup
 *
 * Advanced effects with:
 * 1. untracked(): read signals without creating dependencies
 * 2. Manual cleanup: manage resources like timers, subscriptions, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  // Signals for tracking events using native # syntax
  #events = signal<AnalyticsEvent[]>([]);
  readonly events = this.#events.asReadonly();

  // Signals for configuration
  #enableLogging = signal(true);
  readonly enableLogging = this.#enableLogging.asReadonly();

  #batchSize = signal(5);
  readonly batchSize = this.#batchSize.asReadonly();

  #autoSaveInterval = signal(10000); // 10 seconds
  readonly autoSaveInterval = this.#autoSaveInterval.asReadonly();

  constructor() {
    this.#setupLoggingEffect();
    this.#setupAutoSaveEffect();
  }

  /**
   * EXAMPLE 3.1: Effect with untracked()
   *
   * untracked() allows reading a signal WITHOUT creating a dependency.
   * Useful when we want to:
   * - Access configurations that shouldn't retrigger the effect
   * - Avoid infinite loops
   * - Optimize performance
   */
  #setupLoggingEffect(): void {
    effect(() => {
      const events = this.#events(); // TRACKED: effect reruns when #events changes

      // untracked() reads #enableLogging WITHOUT creating dependency
      // The effect does NOT rerun when #enableLogging changes
      const loggingEnabled = untracked(() => this.#enableLogging());

      if (loggingEnabled && events.length > 0) {
        const lastEvent = events[events.length - 1];
        console.log('New event tracked:', lastEvent);

        // Multiple untracked reads example
        const batchSize = untracked(() => this.#batchSize());
        if (events.length % batchSize === 0) {
          console.log(`Batch of ${batchSize} events reached!`);
        }
      }
    });
  }

  /**
   * EXAMPLE 3.2: Effect with Manual Cleanup
   *
   * Effects can return a cleanup function that is:
   * - Called before the next execution of the effect
   * - Called when the effect is destroyed
   *
   * Useful for:
   * - Canceling timers (setTimeout, setInterval)
   * - Closing WebSocket connections
   * - Canceling subscriptions
   * - Freeing resources
   */
  #setupAutoSaveEffect(): void {
    effect((onCleanup) => {
      const interval = this.#autoSaveInterval(); // TRACKED
      const enabled = this.#enableLogging(); // TRACKED

      if (!enabled) {
        console.log('Auto-save disabled');
        return;
      }

      console.log(`Auto-save configured every ${interval}ms`);

      // Create an interval timer
      const timerId = setInterval(() => {
        // Use untracked to not create dependencies in the callback
        const events = untracked(() => this.#events());

        if (events.length > 0) {
          console.log(`Auto-save: ${events.length} events saved`);
          this.#simulateSaveToServer(events);
        }
      }, interval);

      // CLEANUP: called when:
      // 1. #autoSaveInterval or #enableLogging change (before next run)
      // 2. The service is destroyed
      onCleanup(() => {
        console.log('Cleanup: canceling previous timer');
        clearInterval(timerId);
      });
    });
  }

  /**
   * EXAMPLE 3.3: Effect with Multiple Cleanups
   *
   * We can manage multiple resources to clean up
   */
  setupAdvancedMonitoring(): void {
    effect((onCleanup) => {
      const events = this.#events();
      const interval = untracked(() => this.#autoSaveInterval());

      console.log('Advanced monitoring activated');

      // Simulate multiple resources
      const timerId = setTimeout(() => {
        console.log('Timeout monitoring executed');
      }, interval);

      const intervalId = setInterval(() => {
        const currentEvents = untracked(() => this.#events());
        console.log(`Stats: ${currentEvents.length} total events`);
      }, 5000);

      // Simulate a listener
      const handleBeforeUnload = () => {
        console.log('Page closing, saving data...');
      };
      window.addEventListener('beforeunload', handleBeforeUnload);

      // Cleanup ALL resources
      onCleanup(() => {
        console.log('Complete monitoring cleanup');
        clearTimeout(timerId);
        clearInterval(intervalId);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      });
    });
  }

  // Public methods
  trackEvent(type: string, data: any = {}): void {
    const event: AnalyticsEvent = {
      type,
      timestamp: new Date(),
      data
    };

    this.#events.update(events => [...events, event]);
  }

  toggleLogging(): void {
    this.#enableLogging.update(v => !v);
  }

  setBatchSize(size: number): void {
    this.#batchSize.set(size);
  }

  setAutoSaveInterval(ms: number): void {
    this.#autoSaveInterval.set(ms);
  }

  clearEvents(): void {
    this.#events.set([]);
  }

  #simulateSaveToServer(events: AnalyticsEvent[]): void {
    // Simulate API call
    console.log('Sending data to server...', {
      count: events.length,
      firstEvent: events[0]?.type,
      lastEvent: events[events.length - 1]?.type
    });
  }
}
