import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@shared/button/button.component';

@Component({
  selector: 'app-help-modal',
  standalone: true,
  imports: [
    MatIconModule,
    ButtonComponent
  ],
  templateUrl: './help-modal.component.html',
  styleUrl: './help-modal.component.scss'
})
export class HelpModalComponent {
  open = false;


  toggleOpen() {
    this.open = !this.open
  }
}
