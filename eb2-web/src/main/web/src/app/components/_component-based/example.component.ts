import { Component } from '@angular/core';

@Component({
  selector: 'component-based-factory',
  template: `
    <div>Factory Component Example</div>
    
    <div>
      <button (click)="green()">Green</button>
      <button (click)="red()">Red</button>
    </div>

    <app-factory [type]="type"></app-factory>

    <div class="container">
    <p><a [routerLink]="['/home']">Home</a></p>
    </div>
  `,
})
export class ExampleComponent {
  type = "";

  green() {
    this.type = "green";
  }

  red() {
    this.type = "red";
  }
}