import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)
  private readonly API_URL = 'http://localhost:8080/users'

  login(credentials: any){
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token',res.token)
      })
    )
  }

  register(userData: any) {
    return this.http.post(`${this.API_URL}/register`, userData);
  }


  
  
  
}
