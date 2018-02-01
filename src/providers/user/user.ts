import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  //Set up the URL
  private url: string = 'http://localhost:3000/api/users';

  constructor(public http: HttpClient) {}

  public getUsers(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + `/view/${id}`);
  }

  public createUser (user: User): Observable<User> {
    return this.http.post<User>(this.url + '/create', user, httpOptions);
  }

  public editUser (user: User): Observable<User> {
    return this.http.post<User>(this.url + '/edit', user, httpOptions);
  }

  public deleteUser (id: string): Observable<User> {
    return this.http.get<User>(this.url + `/delete/${id}`);
  }
}
