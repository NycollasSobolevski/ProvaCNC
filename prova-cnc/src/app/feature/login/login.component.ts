import { HeaderComponent } from '@shared/header/header.component';
import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import UserService from '@domain/user/user.service';
import LoginBody from '@domain/user/login.model';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertComponent } from '@shared/alert/alert.component';
import AlertService from '@shared/alert/_utils/alert.service';
import AlertType from '@shared/alert/_utils/AlertType.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    ReactiveFormsModule,
    AlertComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private service : UserService,
    protected alertService : AlertService,
    private router : Router
  ){}

  loginForm : FormGroup = new FormGroup({
    login : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)
  })

  login () {
    if(!this.loginForm.valid) {
      this.alertService.open({kind: AlertType.Warning, message: "Dados Inválidos"})
      return;
    }
    const formValues = this.loginForm.getRawValue();

    const body : LoginBody = {
      login: formValues['login'],
      password : formValues['password']
    }

    this.service.login(body).subscribe({
      next: (res) => {
        sessionStorage.setItem('token', res.value);
        this.router.navigate(['home'])
      },
      error: (err : HttpErrorResponse) => {
        console.log(err.error);
        this.alertService.open({kind: AlertType.Warning, message: err.error})
      }
    })
  }
}
