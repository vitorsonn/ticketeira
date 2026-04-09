import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventResponse } from '../../../../models/event.model';
import { EventService } from '../../../../services/event-service';
import { finalize } from 'rxjs/operators';
import { EventCard } from '../../../events/event-card/event-card';

@Component({
  selector: 'app-admin-events-list',
  imports: [CommonModule,EventCard],
  templateUrl: './admin-events-list.html',
  styleUrl: './admin-events-list.css',
})
export class AdminEventsList {
  events = signal<EventResponse[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor(private service: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.service
      .getEvents()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (events) => this.events.set(events),
        error: (err) => {
          console.error(err);
          this.error.set('Falha ao carregar eventos');
        },
      });
  }

  deleteEventById(evento: EventResponse) {
    if(confirm(`Tem certeza que deseja excluir o evento "${evento.name}"?`)){
       this.service.deleteEvents(evento.id).subscribe({
      next: () => {
        this.events.update((events) => events.filter((e) => e.id !== evento.id));
      },

      error: (err) => {
        console.error('Erro ao deletar', err);
      },
    });

    }

  }

  abrirModalEdicao(event: EventResponse): void {
  console.log('Editando evento:', event.name);
  // Geralmente aqui você navega para a rota de edição:
  // this.router.navigate(['/admin/events/edit', event.id]);

  // Ou abre um Modal passando os dados do evento para o formulário
}
}
