import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { DataService, User } from '../data.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  token = localStorage.getItem('token') || null;
  todos: Array<{
    title: string,
    _id: string
  }> = []
  userId: string | null = null
  subscription: Subscription;
  checkoutForm = this.formBuilder.group({
    todo: ['', Validators.required]
  });
  submitted = false;

  constructor(
    private todoService: TodoService,
    private dataService: DataService,
    private formBuilder: FormBuilder,

  ) {
    this.subscription = this.dataService.getUserId().subscribe((id: any) => {
      this.userId = id;
      if (id) {
        this.todoService.getTodos(id, this.token)
          .subscribe(
            (data: any) => {
              this.todos = data;
            },
            error => console.log(error)
          );
      }
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const id = this.dataService.user?._id
    if (id) {
      this.todoService.getTodos(id, this.token)
        .subscribe(
          (data: any) => {
            this.todos = data;
          },
          error => console.log(error)
        );
    }

  }

  onDeleteItem(id: string) {
    this.todoService.deleteTodo(id, this.token)
      .subscribe(
        (data: any) => {
          const filterdTodos = this.todos.filter((item) => item._id != data._id)
          this.todos = filterdTodos;
        },
        error => console.log(error)
      );
  }

  onSubmit() {

    const id = this.dataService.user?._id
    this.submitted = true;

    if (this.checkoutForm.valid && id) {
      console.warn('add', this.checkoutForm.value);
      this.todoService.addTodo(id, this.checkoutForm.value.todo, this.token)
        .subscribe(
          (data: any) => {
            this.todos = [...this.todos, data]
            this.submitted = false;
          },
          error => console.log(error)
        );
      this.checkoutForm.reset();
      for (let control in this.checkoutForm.controls) {
        this.checkoutForm.controls[control].setErrors(null);
      }
    }
  }

  get f() { return this.checkoutForm.controls; }

}
