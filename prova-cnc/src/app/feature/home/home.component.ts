import { Component } from '@angular/core';
import { Router } from '@angular/router';
import User from '@domain/user/user.model';
import UserService from '@domain/user/user.service';
import { ButtonComponent } from '@shared/button/button.component';
import { HeaderComponent } from '@shared/header/header.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor( private router : Router){}

  ngOnInit() {
  }


  newTestToggle () {
    this.router.navigate(['newTest'])
  }
  allTestsToggle () {
    this.router.navigate(['allTests'])
  }
}
