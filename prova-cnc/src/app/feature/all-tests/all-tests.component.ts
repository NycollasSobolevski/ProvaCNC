import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/header/header.component';

@Component({
  selector: 'app-all-tests',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './all-tests.component.html',
  styleUrl: './all-tests.component.scss'
})
export class AllTestsComponent {

}
