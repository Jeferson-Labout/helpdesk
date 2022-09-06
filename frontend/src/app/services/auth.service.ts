import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import {Credenciais} from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais): Observable<any> {
    
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds)
  }

  successfulLogin(authToken: string , email: string, id:string) {
    localStorage.setItem('token', authToken);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);
    
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }

  logout() {
    localStorage.clear();
  }
}
