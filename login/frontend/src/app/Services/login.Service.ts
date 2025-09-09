import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ILogin } from '../Interface/ILogin.Interface';
import { IUsuario } from '../Interface/IUsuario.Interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly rutaAPI = 'https://localhost:7112/api/Usuarios';
  constructor(private http: HttpClient) {}

 login(login: ILogin):Observable<IUsuario>{
    return this.http.post<ILogin>(this.rutaAPI + '/login', login)
  }
 }

