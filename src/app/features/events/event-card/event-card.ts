import { Component, input, output } from '@angular/core';
import { EventResponse } from '../../../models/event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  // Usando a nova API de Inputs do Angular 17.1+
  event = input.required<EventResponse>();
  isAdmin = input<boolean>(false);

  // Outputs para avisar o pai quando clicar em ações de admin
  onEdit = output<EventResponse>();
  onDelete = output<EventResponse>();
  onView = output<EventResponse>();

  handleEdit() {
    this.onEdit.emit(this.event());
  }

  handleDelete() {
    this.onDelete.emit(this.event());
  }

}
