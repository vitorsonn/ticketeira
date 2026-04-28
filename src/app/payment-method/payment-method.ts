import { Component, OnInit, inject, Input } from '@angular/core';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { StripeService } from '../services/stripe-service';



@Component({
  selector: 'app-payment-method',
  standalone: true,
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.css',
})
export class PaymentMethod implements OnInit {
  private stripeService = inject(StripeService);

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: any;
  @Input() amount: number = 0;

async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51TQx11PU1Sqy0ScK03V1Mjzz24Vo02uu6WJoj0vGKPrzSgmIIgCXai9iDIhQwb5ELc0wYbQ4fPJIEKY6oXiTuArw00UbSyjUYy');

    this.stripeService.createPaymentIntent(this.amount).subscribe(async (clientSecret) => {
      if (this.stripe) {
        this.elements = this.stripe.elements({ clientSecret });
        this.cardElement = this.elements.create('payment'); // Cria o campo completo (cartão, etc)
        this.cardElement.mount('#payment-element'); // Monta na div do HTML
      }
    });
  }

  async confirmarPagamento() {
    if (!this.stripe || !this.elements) return;

    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost:4200/sucesso', // Para onde ele vai depois
      },
    });

    if (error) {
      console.error('Erro no pagamento:', error.message);
    }
  }
}

