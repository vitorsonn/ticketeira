import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/payments/intent';

  createPaymentIntent(amount: number): Observable<string> {
    return this.http.post(this.apiUrl, { amount }, { responseType: 'text' });
  }
}
