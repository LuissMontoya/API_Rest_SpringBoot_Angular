import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesJson } from './clientes.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:5000/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    //return of(ClientesJson);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
}
