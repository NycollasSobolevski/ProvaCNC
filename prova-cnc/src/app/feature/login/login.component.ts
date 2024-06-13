import { HeaderComponent } from '@shared/header/header.component';
import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import UserService from '@domain/user/user.service';
import LoginBody from '@domain/user/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private service : UserService
  ){}

  loginForm : FormGroup = new FormGroup({
    login : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)
  })

  login () {
    if(!this.loginForm.valid) {
      alert('Dados Inválidos')
    }
    const formValues = this.loginForm.getRawValue();

    const body : LoginBody = {
      login: formValues['login'],
      password : formValues['password']
    }

    this.service.login(body).subscribe({
      next: (res) => {
        sessionStorage.setItem('token', res.value);
      }
    })
  }
}
