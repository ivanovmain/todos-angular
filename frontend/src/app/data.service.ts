import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

export interface User {
  _id: string,
  name: string,
  email: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new Subject<any>();

  getUserId(): Observable<any> {
    return this.subject.asObservable();
  }
  
  sendUserId(userId: string) {
    this.subject.next(userId);
  }

  clearUserId() {
    this.subject.next();  
  }

  user:User | null = null;

  constructor() { }

  setUser(user: User) {
    this.user = user
    this.sendUserId(user._id)
  }
  getUser() {
    
  }
}
