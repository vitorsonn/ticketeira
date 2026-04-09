import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event-service';
import { finalize } from 'rxjs';
import { EventResponse } from '../../../models/event.model';
import { EventCard } from '../event-card/event-card';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule,EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  events = signal<EventResponse[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private service: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading.set(true);
    this.service
      .getEvents() // Por enquanto, usa o mesmo método que traz tudo
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (events) => this.events.set(events),
        error: (err) => this.error.set('Não foi possível carregar os eventos agora.')
      });
  }

  irParaPaginaDeCompra(event: EventResponse): void {
    console.log('navegando para o evento ID: ', event.id)
  }

}
