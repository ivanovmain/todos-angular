import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TODO'
  constructor(
    private todoService: TodoService,
    private dataService: DataService
  ) {
  }
  
  get name() {
    return this.dataService.user?.name || ""
  }

  ngOnInit() {
    const token = localStorage.getItem('token') || '';
    this.todoService.getUserFromToken(token)
    .subscribe(
      (data: any) => {
        this.dataService.setUser(data);
        this.dataService.sendUserId(data._id)
      },
      error => console.log(error)
  );
  }
}
