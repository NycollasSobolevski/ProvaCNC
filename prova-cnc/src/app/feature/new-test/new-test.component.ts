import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/header/header.component';

@Component({
  selector: 'app-new-test',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './new-test.component.html',
  styleUrl: './new-test.component.scss'
})
export class NewTestComponent {

}
