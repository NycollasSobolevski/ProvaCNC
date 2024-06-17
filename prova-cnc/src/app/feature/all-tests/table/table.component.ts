import { Component } from '@angular/core';
import { Router } from '@angular/router';
import GetAllReturn from '@domain/_utils/getAll.model';
import Test from '@domain/test/test.model';
import TestService from '@domain/test/test.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  constructor(
    private service : TestService,
    private router: Router
  ){}

  data!: GetAllReturn<Test>;
  page = 0;
  limit = 10;

  ngOnInit(){
    this.getAll();

  }

  toggleTest (item: Test) {
    this.router.navigate([`testDetails/${item.id}`])
  }

  getAll () {
    this.service.getAll(this.page,this.limit).subscribe({
      next: (res) => {
        this.data = res;
      }
    })
  }
}
