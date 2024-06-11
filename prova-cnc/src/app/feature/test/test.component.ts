import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/header/header.component';
import { ButtonComponent } from '@shared/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { TestDetailComponent } from './test-detail/test-detail.component';
import TestService from '@domain/test/test.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  constructor(
    private dialog : MatDialog,
    protected service : TestService
  ){}

  form : FormGroup= new FormGroup({
    code : new FormControl("", Validators.required)
  })

  ngOnInit() {
    this.form.controls['code'].setValue("123123")
    this.toggleSend()
  }

  toggleSend () {
    if(!this.form.valid){
      return 
    }

    const code = this.form.controls['code'].value;

    this.service.GetTest(code).subscribe({
      next: (res) => {
        console.log(res);
        
        const diag = this.dialog.open(TestDetailComponent)
        diag.componentInstance.test = res
      }
      
    });
  }


}
