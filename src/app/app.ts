import { Component, signal } from '@angular/core';
import { CounterComponent } from './components/counter.component';

@Component({
  selector: 'app-root',
  imports: [
    CounterComponent,
    //TodoComponent,
    // AnalyticsComponent
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular Signals - Complete Guide');
}
