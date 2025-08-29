import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../Services/cliente.service';
import { RouterLink } from '@angular/router';
import { ICliente } from '../interfases/icliente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent {
  lista_clientes$!: ICliente[];

  constructor(private clienteServicio: ClienteService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.clienteServicio.todos().subscribe(
      (clientes) => {
      this.lista_clientes$ = clientes;
    }
    );
  }
}
