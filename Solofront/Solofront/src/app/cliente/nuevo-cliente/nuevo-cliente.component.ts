import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService } from '../../Services/cliente.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-cliente',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css',
})
export class NuevoClienteComponent {
  clienteforms: FormGroup = new FormGroup({});
  constructor(
    private clienteServicio: ClienteService,
    private navegacion: Router
  ) {
    this.clienteforms = new FormGroup({
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  guardarCliente() {
    const cliente = this.clienteforms.value;
    this.clienteServicio.guardarCliente(cliente).subscribe((uncliente) => {
      alert('Cliente guardado con exito');
      this.clienteforms.reset();
      console.log(uncliente);
      this.navegacion.navigate(['']);
    });
  }
}
