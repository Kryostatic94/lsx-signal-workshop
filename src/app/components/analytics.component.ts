import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card boss-card">
      <h2>EXAMPLE 3: ADVANCED - Effects with untracked() and Cleanup</h2>
      
      <div class="boss-badge">
        <span class="badge">ADVANCED LEVEL</span>
      </div>
      
      <div class="controls">
        <div class="control-group">
          <label>
            <input 
              type="checkbox" 
              [checked]="analyticsService.enableLogging()"
              (change)="analyticsService.toggleLogging()"
            />
            <strong>Logging Enabled</strong>
            <span class="hint">(untracked in logging effect)</span>
          </label>
        </div>
        
        <div class="control-group">
          <label>
            <strong>Batch Size:</strong>
            <input 
              type="range" 
              min="1" 
              max="10" 
              [value]="analyticsService.batchSize()"
              (input)="onBatchSizeChange($event)"
            />
            <span class="value">{{ analyticsService.batchSize() }}</span>
            <span class="hint">(untracked, won't retrigger effect)</span>
          </label>
        </div>
        
        <div class="control-group">
          <label>
            <strong>Auto-save Interval (ms):</strong>
            <select 
              [value]="analyticsService.autoSaveInterval()"
              (change)="onIntervalChange($event)"
            >
              <option [value]="3000">3 seconds (fast)</option>
              <option [value]="5000">5 seconds</option>
              <option [value]="10000">10 seconds</option>
              <option [value]="15000">15 seconds (slow)</option>
            </select>
            <span class="hint">(tracked, automatic timer cleanup)</span>
          </label>
        </div>
      </div>
      
      <div class="actions">
        <button (click)="trackRandomEvent()" class="primary-btn">
          Track Random Event
        </button>
        <button (click)="trackMultipleEvents()" class="secondary-btn">
          Track 3 Events
        </button>
        <button (click)="analyticsService.clearEvents()" class="danger-btn">
          Clear Events
        </button>
      </div>
      
      <div class="events-section">
        <h3>Tracked Events ({{ analyticsService.events().length }})</h3>
        <div class="events-list">
          @for (event of analyticsService.events().slice(-10).reverse(); track $index) {
            <div class="event-item">
              <span class="event-type">{{ event.type }}</span>
              <span class="event-time">{{ event.timestamp | date:'HH:mm:ss' }}</span>
              <span class="event-data">{{ event.data | json }}</span>
            </div>
          } @empty {
            <p class="empty-state">No events tracked yet</p>
          }
        </div>
      </div>
      
      <div class="explanation boss-explanation">
        <h4>ADVANCED Concepts:</h4>
        
        <div class="concept">
          <h5>1. untracked() in Effects</h5>
          <ul>
            <li><strong>Problem</strong>: Sometimes we want to read a signal without it becoming a dependency</li>
            <li><strong>Solution</strong>: <code>untracked(() => signal())</code></li>
            <li><strong>Use case</strong>: Configurations that shouldn't retrigger the effect</li>
            <li><strong>Example in code</strong>: enableLogging is read with untracked() in logging effect</li>
          </ul>
        </div>
        
        <div class="concept">
          <h5>2. Manual Cleanup in Effects</h5>
          <ul>
            <li><strong>Problem</strong>: Timers, subscriptions and resources must be cleaned up</li>
            <li><strong>Solution</strong>: <code>effect((onCleanup) => {{ '{' }} ... onCleanup(() => {{ '{' }}...{{ '}' }}) {{ '}' }})</code></li>
            <li><strong>When called</strong>: Before next run or on destruction</li>
            <li><strong>Example in code</strong>: setInterval is canceled in cleanup</li>
          </ul>
        </div>
        
        <div class="concept">
          <h5>3. Best Practices</h5>
          <ul>
            <li>Use untracked() to avoid unnecessary dependencies</li>
            <li>Always cleanup timers and subscriptions</li>
            <li>Combine untracked() in async callbacks</li>
            <li>Avoid infinite loops by not modifying signals you're observing</li>
          </ul>
        </div>
        
        <div class="live-demo">
          <h5>LIVE DEMO</h5>
          <p>Open the browser console to see:</p>
          <ul>
            <li>Logs when you add events</li>
            <li>Periodic auto-save</li>
            <li>Cleanup when you change the interval</li>
            <li>Batch notifications every N events</li>
          </ul>
        </div>
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
    
    .boss-card {
      border: 3px solid #FF6B6B;
      background: linear-gradient(135deg, #fff 0%, #fff5f5 100%);
    }
    
    .boss-badge {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .badge {
      background: linear-gradient(135deg, #FF6B6B, #FF8E53);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 14px;
      box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
    }
    
    .controls {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .control-group {
      margin: 15px 0;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 4px;
    }
    
    .control-group label {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .hint {
      font-size: 12px;
      color: #FF6B6B;
      font-style: italic;
    }
    
    input[type="range"] {
      flex: 1;
      min-width: 150px;
    }
    
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    
    select {
      padding: 8px;
      border: 2px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
    }
    
    .value {
      background: #FF6B6B;
      color: white;
      padding: 4px 12px;
      border-radius: 4px;
      font-weight: bold;
      min-width: 30px;
      text-align: center;
    }
    
    .actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    
    button {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    
    .primary-btn {
      background: #FF6B6B;
      color: white;
    }
    
    .primary-btn:hover {
      background: #FF5252;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(255, 107, 107, 0.3);
    }
    
    .secondary-btn {
      background: #4ECDC4;
      color: white;
    }
    
    .secondary-btn:hover {
      background: #3DBDB4;
    }
    
    .danger-btn {
      background: #95a5a6;
      color: white;
    }
    
    .danger-btn:hover {
      background: #7f8c8d;
    }
    
    .events-section {
      margin: 20px 0;
    }
    
    .events-section h3 {
      color: #FF6B6B;
      border-bottom: 2px solid #FF6B6B;
      padding-bottom: 10px;
    }
    
    .events-list {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 15px;
    }
    
    .event-item {
      display: flex;
      gap: 10px;
      padding: 10px;
      background: #f5f5f5;
      border-left: 3px solid #FF6B6B;
      margin-bottom: 8px;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .event-type {
      font-weight: bold;
      color: #FF6B6B;
      min-width: 120px;
    }
    
    .event-time {
      color: #888;
      min-width: 80px;
    }
    
    .event-data {
      flex: 1;
      color: #555;
      font-family: monospace;
      font-size: 12px;
    }
    
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #888;
    }
    
    .boss-explanation {
      background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%);
      border-left: 4px solid #FF6B6B;
      padding: 20px;
      margin-top: 20px;
    }
    
    .boss-explanation h4 {
      color: #FF6B6B;
      margin-top: 0;
      font-size: 1.3em;
    }
    
    .concept {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
    }
    
    .concept h5 {
      color: #FF6B6B;
      margin-top: 0;
    }
    
    .concept ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    .concept li {
      margin: 8px 0;
      line-height: 1.6;
    }
    
    .concept code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
      color: #FF6B6B;
    }
    
    .live-demo {
      background: #fffacd;
      padding: 15px;
      border-radius: 4px;
      border: 2px dashed #FFD700;
      margin-top: 15px;
    }
    
    .live-demo h5 {
      color: #FF6B6B;
      margin-top: 0;
    }
  `]
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  analyticsService = inject(AnalyticsService);
  
  #eventTypes = [
    'page_view',
    'button_click',
    'form_submit',
    'api_call',
    'user_action'
  ];
  
  ngOnInit(): void {
    console.log('AnalyticsComponent initialized - check the console!');
  }
  
  ngOnDestroy(): void {
    console.log('AnalyticsComponent destroyed');
  }
  
  trackRandomEvent(): void {
    const randomType = this.#eventTypes[Math.floor(Math.random() * this.#eventTypes.length)];
    const randomData = {
      value: Math.floor(Math.random() * 100),
      source: 'manual'
    };
    
    this.analyticsService.trackEvent(randomType, randomData);
  }
  
  trackMultipleEvents(): void {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.trackRandomEvent();
      }, i * 300);
    }
  }
  
  onBatchSizeChange(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.analyticsService.setBatchSize(value);
  }
  
  onIntervalChange(event: Event): void {
    const value = parseInt((event.target as HTMLSelectElement).value);
    this.analyticsService.setAutoSaveInterval(value);
  }
}
