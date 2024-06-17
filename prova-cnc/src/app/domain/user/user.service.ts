import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import BaseService from "@domain/Base.Service";
import LoginBody from './login.model';
import Jwt from '@domain/_utils/jwt.model';
import User from './user.model';
import { jwtDecode } from 'jwt-decode';
import JwtPayload from './jwtPayload.model';

@Injectable({
  providedIn: 'root'
})
export default class UserService extends BaseService<User> {
  constructor( client : HttpClient ){ super('User', client) }

  login (body: LoginBody) {
    return this.client.post<Jwt>(`${this.fullEndPoint}/auth/login`, body).pipe();
  }

  subscribe (body : User)  {
    return this.client.post<Jwt>(`${this.fullEndPoint}/auth/subscribe`, body).pipe();
  }

  static getLoggedUser () : JwtPayload | undefined {
    const token = sessionStorage.getItem('token') ?? "";
    const user = jwtDecode<JwtPayload>(token);
    return user;
  }

}
