import { Component, EventEmitter, Input, Output, booleanAttribute, input } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
type buttonVariants = "primary" | "secondary" | "tertiary" | "integrated" | "link";
type buttonIconPosition = "left" | "right";
type type = "default" | "danger" | "warning" | "success"

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss',
    './themes/primmary.scss',
    './themes/secondary.scss',
    './themes/tertiary.scss',
    './themes/link.scss',
    './themes/integrated.scss',

  ]
})
export class ButtonComponent {
  @Input("label") label : string | null = null;
  @Input() variant : buttonVariants = "primary" ;
  @Input({ transform: booleanAttribute })
  disabled : boolean = false
  @Input("iconPosition") iconPosition : buttonIconPosition = "left";
  @Input("icon") icon : string | null = null;
  @Input("iconPath") iconPath : string | null = null;
  @Output("submit") onSubmit = new EventEmitter();
  @Input("type") type : type = "default";
  
  submit()
  {
    this.onSubmit.emit();
  }

}
