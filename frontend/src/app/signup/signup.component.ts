import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private dataService: DataService,
    public router: Router
  ) { }

  checkoutForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(3)]]
  },
    {
      validators: this.password

    }
  );

  password(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if ((password && password.value) != (confirmPassword && confirmPassword.value)) {
      confirmPassword && confirmPassword.setErrors({ mustMatch: true })
    } else {
      confirmPassword && confirmPassword.setErrors(null)
    }
    
  }

  get f() { return this.checkoutForm.controls; }
  


  ngOnInit(): void {
  }
  onSubmit(): void {
    this.submitted = true;

    if(this.checkoutForm.valid) {
      console.warn('signup submitted', this.checkoutForm.value);
      
    this.todoService.sigup(this.checkoutForm.value.name, this.checkoutForm.value.email, this.checkoutForm.value.password)
    .subscribe(
      (data: any) => {
        console.log('data', data);
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
