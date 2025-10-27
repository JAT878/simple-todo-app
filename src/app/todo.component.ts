import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, TodoItem } from './todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: TodoItem[] = [];
  newTodoTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;
    this.todoService.addTodo(this.newTodoTitle.trim()).subscribe(todo => {
      this.todos.push(todo);
      this.newTodoTitle = '';
    });
  }

  toggleComplete(todo: TodoItem) {
    this.todoService.toggleTodo(todo.id).subscribe(updated => {
      const index = this.todos.findIndex(t => t.id === todo.id);
      this.todos[index] = updated;
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') this.addTodo();
  }
}
