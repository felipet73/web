import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { IUsuarioInterface } from '../Interface/iusuario.interface';
import autoTable, { RowInput } from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  async generarPDF(lista_usuarios:IUsuarioInterface[], titulo = "Lista de Usuarios"  ):Promise<Blob>{
    const doc = new jsPDF({orientation: 'portrait',unit:'pt',format:'a4'});

    doc.setFontSize(16);
    doc.text(titulo,40,40)

    doc.setFontSize(12);
    doc.text(`Generado ${new Date().toLocaleDateString()}`,40,50)
/*
 nombre: string;
  apellido: string;
  email: string;
  contrasenia: string;
  activo: boolean;
*/
    //tabla
    const cabecera = [['#','Nombre','Apellido','Email','Contraseña','Activo']]
    const body:RowInput[] = lista_usuarios.map(usuario =>[
      String(usuario.id),
      usuario.nombre,
      usuario.apellido,
      usuario.email,
      usuario.contrasenia,
      usuario.activo === true ? 'Si':'No'
    ])

    autoTable(doc,{
      head: cabecera,
      body:body,
      startY: 70,
      styles:{fontSize:9, cellPadding:6, overflow:'linebreak'},
      headStyles:{fillColor:[30,64,175]},
      columnStyles:{
        0:{cellWidth:40},
        1:{cellWidth:100},
        2:{cellWidth:100},
        3:{cellWidth:40},
        4:{cellWidth:100},
        5:{cellWidth:100}
      },
      didDrawPage: data => {
        const str = `Pagina ${data.pageNumber} de ${doc.internal.pages}`
        doc.setFontSize(10);
        doc.text(str, doc.internal.pageSize.getWidth()-60,doc.internal.pageSize.getHeight()-10)
      }
    })

    const blob = await doc.output('blob')
    return blob;
  }

  descargarBlob(blob:Blob, nombre = "lista.pdf"){
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = nombre
    a.href = url
    a.click()
    URL.revokeObjectURL(url)
  }

}
