import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../../services/event-service';
import { EventRequest } from '../../../../models/event.model';
@Component({
  selector: 'app-admin-events-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin-events-form.html',
  styleUrl: './admin-events-form.css',
})
export class AdminEventsForm {

  private fb = inject(FormBuilder)
  private eventService = inject(EventService)

  isSubmitting = signal(false);

  eventForm = this.fb.group({
    name: ['',Validators.required],
    date: ['', Validators.required],
    localization: ['', Validators.required],
    description: ['', Validators.required]
  })


  onSubmit(){
    if(this.eventForm.valid && !this.isSubmitting()){
      this.isSubmitting.set(true);
      const newEvent = this.eventForm.getRawValue() as EventRequest

      this.eventService.cadastrar(newEvent).subscribe({
        next: () => {
          alert('Evento cadastrado com sucesso!')
          this.eventForm.reset()
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error('Erro ao cadastrar evento', err);
          alert('Erro: Verifique se você tem permissão de ADMIN.');
          this.isSubmitting.set(false);
        }


      })
    }
  }

}
