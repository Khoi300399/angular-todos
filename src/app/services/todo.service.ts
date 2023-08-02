import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private static readonly TodoStorageKey: string = 'todos';
  constructor(private storageService: LocalStorageService) {}
  private todos!: Todo[];
  private filterdTodos!: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private lengthFilterSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  private currentFilter: Filter = Filter.All;

  public todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  public length$: Observable<number> = this.lengthSubject.asObservable();
  public lengthFilter$: Observable<number> =
    this.lengthFilterSubject.asObservable();
  public getTodosStorage() {
    this.todos =
      this.storageService.getValue<Todo[]>(TodosService.TodoStorageKey) || [];
    this.filterTodos(this.currentFilter);
    this.updateTodosData();
  }
  public updateTodosStorage() {
    this.storageService.setObject(TodosService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter);
  }
  public filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filterdTodos = this.todos.filter((todo) => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filterdTodos = this.todos.filter((todo) => todo.isCompleted);
        break;
      case Filter.All:
        this.filterdTodos = [...this.todos.map((todo) => ({ ...todo }))];
    }
    if (isFiltering) {
      this.updateTodosData();
    }
  }
  public addTodo(content: string) {
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, content);
    this.todos.unshift(newTodo);
    this.updateTodosStorage();
  }
  public deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateTodosStorage();
  }
  public changeStatus(id: number, isCompleted: boolean) {
    const todoTarget = this.todos.find((todo) => todo.id === id);
    if (todoTarget) todoTarget.isCompleted = isCompleted;
    this.updateTodosStorage();
  }
  public changeContent(id: number, content: string) {
    const todoTarget = this.todos.find((todo) => todo.id === id);
    if (todoTarget) todoTarget.content = content;
    this.updateTodosStorage();
  }
  public sortAlphabet() {
    this.todos = this.todos.sort((a, b) => a.content.localeCompare(b.content));
    this.updateTodosStorage();
  }
  public sortAlphabetReverse() {
    this.todos = this.todos.sort((a, b) => b.content.localeCompare(a.content));
    this.updateTodosStorage();
  }
  public toggleAll() {
    this.todos = this.todos.map((todo) => ({
      ...todo,
      isCompleted: !this.todos.every((t) => t.isCompleted),
    }));
    this.updateTodosStorage();
  }
  public clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.isCompleted);
    this.updateTodosStorage();
  }
  private updateTodosData() {
    this.displayTodosSubject.next(this.filterdTodos);
    this.lengthSubject.next(this.todos.length);
    this.lengthFilterSubject.next(this.filterdTodos.length);
  }
}
