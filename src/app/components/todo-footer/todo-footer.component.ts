import { Component, OnInit } from '@angular/core';
import { Filter, FilterButton } from '../../models/filtering.model';
import { TodosService } from '../../services/todo.service';
import { Observable, map, takeUntil } from 'rxjs';
import { DestroyService } from '../../services/destroy.service';

@Component({
  selector: 'todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss'],
})
export class TodoFooterComponent implements OnInit {
  length!: number;
  totalItem$!: Observable<boolean>;
  hasCompleted!: boolean;
  constructor(
    private todoService: TodosService,
    private destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.todoService.lengthFilter$
      .pipe(takeUntil(this.destroy$))
      .subscribe((length) => (this.length = length));

    this.todoService.todos$
      .pipe(map((todos) => todos.some((t) => t.isCompleted)))
      .subscribe((hasCompleted) => (this.hasCompleted = hasCompleted));
  }
  filter(type: Filter) {
    this.setAcitveFilterBtn(type);
  }
  private setAcitveFilterBtn(type: Filter) {
    this.filterButtons.forEach((btn) => {
      btn.isActive = btn.type === type;
    });
    this.todoService.filterTodos(type);
  }
  clearCompleted() {
    this.todoService.clearCompleted();
  }
  filterButtons: FilterButton[] = [
    { type: Filter.All, label: 'All', isActive: true },
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Completed', isActive: false },
  ];
}
