import { Component, signal } from '@angular/core';
import { CounterComponent } from './components/counter.component';
import { TodoComponent } from './components/todo.component';
import { AnalyticsComponent } from './components/analytics.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent, TodoComponent, AnalyticsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular Signals - Complete Guide');
}
