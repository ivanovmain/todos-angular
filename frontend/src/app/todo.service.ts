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

  login(email: string, password: string) {

    const loginUrl = `${this.baseUrl}/login`;

    const body = {
      email,
      password
    };

    return this.http.post(loginUrl, body);
  }

  sigup(name: string, email: string, password: string) {

    const signupUrl = `${this.baseUrl}/register`;

    const body = {
      name,
      email,
      password
    };

    return this.http.post(signupUrl, body);
  }

  getTodos(userId: string, token: string | null) {
    const todosUrl = `${this.baseUrl}/todos`;

    const body = {
      userId,
      token
    };

    return this.http.post(todosUrl, body);

  }

  addTodo(userId: string, title: string, token: string) {
    const todosUrl = `${this.baseUrl}/addtodo`;

    const body = {
      userId,
      title,
      token
    };

    return this.http.post(todosUrl, body);

  }

  deleteTodo(id: string, token: string) {
    const todosUrl = `${this.baseUrl}/deletetodo`;

    const body = {
      id,
      token
    };

    return this.http.post(todosUrl, body);

  }

  getUserFromToken(token: string) {
    const getUserFromTokenUrl = `${this.baseUrl}/getuser`;

    const body = {
      token
    };

    return this.http.post(getUserFromTokenUrl, body);

  }

}
