import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { DataService, User } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  token = localStorage.getItem('token');
  todos: Array<{
    title: string
  }> = []
  userId: string | null = null
  subscription: Subscription;

  constructor(
    private todoService: TodoService,
    private dataService: DataService

  ) {
    this.subscription = this.dataService.getUserId().subscribe((id:any) => {
      this.userId = id;
      console.log(' this.user id 232323', id);
      if (id) {
        this.todoService.getTodos(id, this.token)
          .subscribe(
            (data: any) => {
              console.log('data todo', data);
              this.todos = data;
            },
            error => console.log(error)
          );
      }
    });
  }


  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const id = this.dataService.user?._id
    if (id) {
      this.todoService.getTodos(id, this.token)
        .subscribe(
          (data: any) => {
            console.log('data todo', data);
            this.todos = data;
          },
          error => console.log(error)
        );
    }

  }
}
