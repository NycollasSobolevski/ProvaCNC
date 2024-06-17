import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  constructor(){}

  @Input()
  label: string = 'label'
  value!: string;
  lines = 1;

  ngOnInit() {
    this.getCode();
  }

  inputAltered(a: any) {
    console.log(a);

  }


  getCode () {
    

  }
}
