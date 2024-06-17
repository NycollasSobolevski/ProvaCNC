import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import JwtPayload from '@domain/user/jwtPayload.model';
import { ButtonComponent } from '@shared/button/button.component';
import { jwtDecode } from 'jwt-decode';

type variant = "default" | 'user' | 'test'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router :Router){}

  ngOnInit() {
    if(this.variant == 'user') {
      const token = sessionStorage.getItem('token') ?? "";
      if(token == ""){
        return
      }
      let username = jwtDecode<JwtPayload>(token).Identification;
      this.username = this.title(username);
    }
  }

  userMenuOpened = false;

  @Input()
  variant: variant = 'default';


  // variables for test variant
  @Input()
  testName? : string
  @Input()
  testTime? : string
  @Input()
  testCode? : string

  // variables for user variant
  @Input()
  username? : string

  toggleUserMenu () {
    this.userMenuOpened = !this.userMenuOpened;
  }

  navigate (location : string) {
    this.router.navigate([location])
  }

  logoff () {
    sessionStorage.clear();
    this.router.navigate(['main'])
  }
  getMenuClass () {
    return this.userMenuOpened ? 'open' : 'close'
  }
  title (value : string) {
    let firstLetter = value[0];
    firstLetter = value.replace(firstLetter, firstLetter.toUpperCase())
    return firstLetter;
  }
}
