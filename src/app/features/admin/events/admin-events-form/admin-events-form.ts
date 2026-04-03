import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../../services/event-service';
import { EventRequest } from '../../../../models/event.model';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-admin-events-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin-events-form.html',
  styleUrl: './admin-events-form.css',
})
export class AdminEventsForm {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);

  private mapToRequest(formValue: any): EventRequest {
    return {
      name: formValue.name,
      dateTime: this.normalizeDateTimeForApi(formValue.dateTime),
      location: formValue.location,
      description: formValue.description,
    };
  }

  isSubmitting = signal(false);

  eventForm = this.fb.group({
    name: ['', Validators.required],
    dateTime: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', Validators.required],
  });

  /**
   * `input type="date"` devolve só `yyyy-MM-dd`. O backend espera `LocalDateTime`
   * (ISO com hora). `datetime-local` pode vir sem segundos.
   */
  private normalizeDateTimeForApi(value: string): string {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

      const pad = (n: number) => String(n).padStart(2, '0');


      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  onSubmit(): void {
    if (this.eventForm.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);

    const req = this.mapToRequest(this.eventForm.getRawValue());

    this.eventService
      .cadastrar(req)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      });
  }

  private handleSuccess(): void {
    alert('Evento cadastrado com sucesso!');
    this.eventForm.reset();
  }

  private handleError(err: any): void {
    console.error('Erro ao cadastrar evento', err);
    alert('Erro: Verifique se você tem permissão de ADMIN.');
  }
}
