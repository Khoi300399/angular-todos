import { Component, AfterViewInit } from '@angular/core';
import { fromEvent, takeUntil } from 'rxjs';
import { DestroyService } from '../../services/destroy.service';
import { TodosService } from '../../services/todo.service';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements AfterViewInit {
  date: Date = new Date();
  isOpen: boolean = false;
  btnToggle!: HTMLSpanElement;
  constructor(
    private destroy$: DestroyService,
    private todoService: TodosService
  ) {}
  sortAlphabet() {
    this.todoService.sortAlphabet();
  }
  sortAlphabetReversee() {
    this.todoService.sortAlphabetReverse();
  }
  toggleAll() {
    this.todoService.toggleAll();
  }
  ngAfterViewInit() {
    this.btnToggle = document.querySelector('.toggle-btn') as HTMLSpanElement;
    const clickObservable = fromEvent(this.btnToggle, 'click').pipe(
      takeUntil(this.destroy$)
    );
    clickObservable.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }
}
