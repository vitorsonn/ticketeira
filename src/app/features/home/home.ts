import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { Inject, inject } from '@angular/core';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
private authService = inject(AuthService)

    logout() {
        this.authService.logout();
      }

}
