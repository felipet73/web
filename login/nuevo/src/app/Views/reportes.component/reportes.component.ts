import { Component, OnInit } from '@angular/core';
import { IUsuarioInterface } from '../../Interface/iusuario.interface';
import { ReporteService } from '../../service/reporte.service';
import { PdfService } from '../../service/pdf.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes.component',
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
})
export class ReportesComponent implements OnInit {
  cargado = false;
  lista_usuarios: IUsuarioInterface[] = [];
  constructor(private reporteService: ReporteService, private pdfServicio: PdfService) {}

  ngOnInit(): void {
    this.cargado = true;
    try {
      this.reporteService.todos().then((lista) => (this.lista_usuarios = lista));
    } catch (error) {
      console.log(error);
    } finally {
      this.cargado = false;
    }
  }
  async generarPDF() {
    this.cargado = true;
    try {
      if (this.lista_usuarios.length < 0) {
        this.reporteService.todos().then((lista) => (this.lista_usuarios = lista));
      }
      const blob = await this.pdfServicio.generarPDF(this.lista_usuarios);
      this.pdfServicio.descargarBlob(blob);
    } catch (e) {
      console.log('error', e);
      alert('No se puedo generar el pdf');
    } finally {
      this.cargado = false;
    }
  }
}
