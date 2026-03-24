import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventRequest } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  private http = inject(HttpClient)
  private readonly API_URL = 'http://localhost:8080/event/create-event'

  cadastrar(evento: EventRequest){
    const token = localStorage.getItem('token')

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.post(this.API_URL,evento, {headers})
  }
  
}
