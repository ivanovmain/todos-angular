import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://localhost:8080';
  loginUrl = `${this.baseUrl}/login`;

  login(email: string, password: string) {

    const body = {
      email,
      password
    };

    return this.http.post(this.loginUrl, body);
  }

}
