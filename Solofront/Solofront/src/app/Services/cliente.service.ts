import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICliente } from '../interfases/icliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly rutaAPI = 'https://localhost:7112/api/Clientes';
  constructor(private http: HttpClient) {}
  todos(): Observable<ICliente[]> {
    var clientes = this.http.get<ICliente[]>(this.rutaAPI).pipe(catchError(this.manejoErrores));
    console.log(clientes);
    return clientes;
  }
  manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
    });
  }
}
