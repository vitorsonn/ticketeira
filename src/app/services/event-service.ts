import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventRequest, EventResponse } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  private http = inject(HttpClient)
  private readonly API_URL = 'http://localhost:8080/events'

  cadastrar(evento: EventRequest){
    const token = localStorage.getItem('token')

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.post<EventResponse>(`${this.API_URL}`, evento, { headers });
  }

  getEvents(): Observable<EventResponse[]>{
  return this.http.get<EventResponse[]>(`${this.API_URL}`);
  }

  deleteEvents(id: number): Observable <void>{
    return this.http.delete<void>(`${this.API_URL}/${id}`)

  }

}
