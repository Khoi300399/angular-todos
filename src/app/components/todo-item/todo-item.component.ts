import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() changeContent: EventEmitter<Todo> = new EventEmitter<Todo>();
  hoverdElement!: HTMLDivElement;
  isHovered: boolean = false;
  isEditing: boolean = false;
  onDeleteTodo() {
    this.delete.emit(this.todo.id);
  }

  onChangeStatus() {
    this.changeStatus.emit({
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    });
  }
  onChangeContent() {
    this.changeContent.emit(this.todo);
  }
  onSubmit(form: NgForm) {
    let { todo } = form.value;
    if (todo && todo.trim() !== '') {
      this.onChangeContent();
      this.isEditing = false;
    }
  }
}
