import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { TodoComponent } from './app/todo.component';

bootstrapApplication(TodoComponent, {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })]
});
