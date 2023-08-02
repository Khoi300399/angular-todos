import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../../services/todo.service';

@Component({
  selector: 'todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent {
  constructor(private todoService: TodosService) {}
  onSubmit(form: NgForm) {
    let { todo } = form.value;
    if (todo && todo.trim() !== '') {
      this.todoService.addTodo(todo);
      form.resetForm();
    }
  }
}
