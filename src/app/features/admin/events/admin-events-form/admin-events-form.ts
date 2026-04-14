import { CommonModule } from '@angular/common';
import { Component, inject, input, signal, output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../../services/event-service';
import { EventRequest, EventResponse } from '../../../../models/event.model';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-admin-events-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin-events-form.html',
  styleUrl: './admin-events-form.css',
})
export class AdminEventsForm implements OnInit {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);

  eventToEdit = input<EventResponse | null>(null);
  onFinish = output<EventResponse | null>();

  isSubmitting = signal(false);

  eventForm = this.fb.group({
    name: ['', Validators.required],
    dateTime: ['', Validators.required],
    location: ['', Validators.required],
    description: ['', Validators.required],
    sectors: this.fb.array([]),
  });

  get sectors() {
    return this.eventForm.controls['sectors'] as FormArray;
  }

  ngOnInit(): void {
    const data = this.eventToEdit();
    if (data) {
      this.eventForm.patchValue({
        name: data.name,
        dateTime: data.dateTime,
        location: data.location,
        description: data.description,
      });

      this.sectors.clear()

      if (data.sectors && data.sectors.length > 0) {
      data.sectors.forEach(s => {
        this.sectors.push(this.fb.group({
          name: [s.name, Validators.required],
          capacity: [s.capacity, [Validators.required, Validators.min(1)]],
          preco: [s.preco, [Validators.required, Validators.min(0)]]
        }));
      });
    }

    } else {
      this.addSector();
    }
  }

  addSector() {
    const sectorForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      preco: [0, [Validators.required, Validators.min(0)]],
    });
    this.sectors.push(sectorForm);
  }

  removeSector(index: number) {
    if (this.sectors.length > 1) {
      this.sectors.removeAt(index);
    }
  }

 private mapToRequest(formValue: any): EventRequest {
    return {
      id: this.eventToEdit()?.id ?? 0,
      name: formValue.name,
      dateTime: this.normalizeDateTimeForApi(formValue.dateTime),
      location: formValue.location,
      description: formValue.description,
      sectors: formValue.sectors
    };
  }

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
    const id = this.eventToEdit()?.id;

    const request$ = id
      ? this.eventService.updateEvent(id, req)
      : this.eventService.cadastrar(req);

    request$
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (res) => {
          this.handleSuccess(res);
        },
        error: (err) => this.handleError(err),
      });
  }

 private handleSuccess(res: EventResponse): void {
    this.onFinish.emit(res);
    this.eventForm.reset();
  }

  private handleError(err: any): void {
    console.error('Erro ao cadastrar evento', err);
    alert('Erro: Verifique se você tem permissão de ADMIN.');
  }

  cancelar(): void {
    this.onFinish.emit(null);
  }
}
