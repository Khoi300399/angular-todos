import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todo.service';
import { Observable, map, takeUntil } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { DestroyService } from '../../services/destroy.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  hasTodo$!: Observable<boolean>;
  todos$!: Observable<Todo[]>;
  constructor(
    private todoService: TodosService,
    private destroy$: DestroyService
  ) {}
  ngOnInit() {
    this.hasTodo$ = this.todoService.length$.pipe(
      map((length) => length > 0),
      takeUntil(this.destroy$)
    );
    this.todos$ = this.todoService.todos$;
  }

  onDeleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
  onChangeStatus(todo: Todo) {
    this.todoService.changeStatus(todo.id, todo.isCompleted);
  }
  onChangeContent(todo: Todo) {
    this.todoService.changeContent(todo.id, todo.content);
  }
}
