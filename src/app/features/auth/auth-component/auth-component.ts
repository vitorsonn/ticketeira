import { AuthService } from './../../../services/auth-service';
import { Component,signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent {
  private AuthService = inject(AuthService)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  activeTab = signal<'login' | 'register'>('login');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmarPassword: ['', Validators.required]
  });

 

  setTab(tab: 'login' | 'register') {
    this.activeTab.set(tab);
  }


onLogin(){
  if(this.loginForm.valid){
    this.AuthService.login(this.loginForm.value).subscribe({
      next: (res) =>{
        console.log('Login Realizado',res)
        this.router.navigate(['/home'])
      },

      error: (err) => {
        console.error("Erro no login",err)
        alert("Usuario ou senha inválidos!")
      }
    })
  }
}

onRegister(){

  if (this.registerForm.value.password !== this.registerForm.value.confirmarPassword) {
    alert("As senhas não coincidem!");
    return;
  }
  

  this.AuthService.register(this.registerForm.value).subscribe({
    next: () => {
      alert("Cadastro realizado com sucesso! Agora pode fazer o login.")
      this.setTab('login')
    },

    error: (err) => {
      console.error("Erro no cadastro",err)
      alert("Erro ao cadastrar")
    }


  })

}





 

 

}
