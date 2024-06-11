import { Component, Input } from '@angular/core';

type variant = "default" | 'user' | 'test'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

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
}
