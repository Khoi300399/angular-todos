import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodosService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hasTodo$!: Observable<boolean>;

  constructor(private todoService: TodosService) {}

  ngOnInit() {
    this.todoService.getTodosStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map((length) => length > 0));
  }
}
