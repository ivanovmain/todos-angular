import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private dataService: DataService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit(): void {

    if (this.checkoutForm.valid) {
      this.todoService.login(this.checkoutForm.value.email, this.checkoutForm.value.password)
        .subscribe(
          (data: any) => {
            localStorage.setItem('token', data.token);
            this.dataService.setUser(data);
            this.router.navigate(['todos']);
          },
          error => console.log(error)
        );
      this.checkoutForm.reset();
    }
  }
}
