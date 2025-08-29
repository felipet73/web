import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClienteComponent } from "./cliente/cliente.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClienteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Solofront';
}
