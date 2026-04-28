import { Component, OnInit, inject,signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
})
export class PaymentSuccess implements OnInit {

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
status = signal<'loading' | 'success' | 'error'>('loading');
ticketDetails = signal<any>(null);
paymentIntentId: string | null = null;

  ngOnInit(){
    const paymentIntentId = this.route.snapshot.queryParamMap.get('payment_intent');
    const statusParam = this.route.snapshot.queryParamMap.get('redirect_status');

    if (statusParam === 'succeeded' && paymentIntentId) {
      this.confirmarComBackend(paymentIntentId);
    } else {
      this.status.set('error');
    }
  }

  confirmarComBackend(id: string) {
    // 2. Avisa o seu Spring Boot para validar e gerar o ingresso
    this.http.get(`http://localhost:8080/api/payments/confirm/${id}`)
      .subscribe({
        next: (res) => {
          this.ticketDetails.set(res);
          this.status.set('success');
        },
        error: () => this.status.set('error')
      });
  }

}
