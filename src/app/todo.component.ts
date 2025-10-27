import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todos: TodoItem[] = [];
  newTodoTitle = '';
  nextId = 1;

  addTodo() {
    if (!this.newTodoTitle.trim()) return;
    this.todos.push({
      id: this.nextId++,
      title: this.newTodoTitle.trim(),
      isCompleted: false
    });
    this.newTodoTitle = '';
  }

  toggleComplete(todo: TodoItem) {
    todo.isCompleted = !todo.isCompleted;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') this.addTodo();
  }
}
