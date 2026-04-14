import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventResponse } from '../../../../models/event.model';
import { EventService } from '../../../../services/event-service';
import { finalize } from 'rxjs/operators';
import { EventCard } from '../../../events/event-card/event-card';
import { AdminEventsForm } from '../admin-events-form/admin-events-form';

@Component({
  selector: 'app-admin-events-list',
  imports: [CommonModule,EventCard,AdminEventsForm],
  templateUrl: './admin-events-list.html',
  styleUrl: './admin-events-list.css',
})
export class AdminEventsList implements OnInit {
  events = signal<EventResponse[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  isModalOpen = signal(false);
  selectedEvent = signal<EventResponse | null>(null);


  constructor(private service: EventService) {}

  abrirModalCadastro() {
    this.selectedEvent.set(null);
    this.isModalOpen.set(true);
  }

  abrirModalEdicao(evento: EventResponse) {
    this.selectedEvent.set(evento);
    this.isModalOpen.set(true);
  }

  handleFinish(result: EventResponse | null) {
    if (result) {
      this.events.update(list => {
        const index = list.findIndex(e => e.id === result.id);
        if (index !== -1) {
          // Se o evento já existia (Edição), substitui ele
          const newList = [...list];
          newList[index] = result;
          return newList;
        }
        // Se for novo (Cadastro), coloca no início da lista
        return [result, ...list];
      });
    }
    // Independente de ter salvo ou cancelado, fecha o modal
    this.isModalOpen.set(false);
    this.selectedEvent.set(null);
  }

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

}
