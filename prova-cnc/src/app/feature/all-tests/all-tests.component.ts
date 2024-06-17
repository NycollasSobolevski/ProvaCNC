import { Component } from '@angular/core';
import TestService from '@domain/test/test.service';
import { HeaderComponent } from '@shared/header/header.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-all-tests',
  standalone: true,
  imports: [
    HeaderComponent,
    TableComponent
  ],
  templateUrl: './all-tests.component.html',
  styleUrl: './all-tests.component.scss'
})
export class AllTestsComponent {
  constructor(
    private service : TestService
  ){}


}
