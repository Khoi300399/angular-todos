import { Component, AfterViewInit } from '@angular/core';
import { fromEvent, takeUntil } from 'rxjs';
import { DestroyService } from './services/destroy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  date: Date = new Date();
  isOpen: boolean = false;
  btnToggle!: HTMLSpanElement;
  constructor(private destroy$: DestroyService) {}

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
