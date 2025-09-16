import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { IUsuarioInterface } from '../Interface/iusuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private readonly rutaAPI = 'https://localhost:7194/api/usuarios';
  
  constructor(private http: HttpClient) { }

  async todos():Promise<IUsuarioInterface[]> {
    const lista_usaurio = this.http.get<IUsuarioInterface[]>(this.rutaAPI);
    return await firstValueFrom(lista_usaurio);
  }
  
}
