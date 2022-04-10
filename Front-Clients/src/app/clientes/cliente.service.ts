import swal from 'sweetalert2';
import { Injectable, LOCALE_ID } from '@angular/core';
import { formatDate, registerLocaleData } from '@angular/common';
import { Cliente } from './cliente';
import { Observable, catchError, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:5000/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    //return of(ClientesJson);
    //return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => {
        let clientes = response as Cliente[];
        return clientes.map((cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //cliente.createAt= formatDate(cliente.createAt, 'dd/MM/yyyy','en-US');
          //cliente.createAt= formatDate(cliente.createAt, 'fullDate','en-US');
          cliente.createAt= formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy','es-CO');

          return cliente;
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }

          console.log(e.error.error);
          swal.fire('Error al Crear', e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        swal.fire('Error al Editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  // Meth2 undefined recibiendo el json
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.log(e.error.mensaje);
          swal.fire('Error al Editar', e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.log(e.error.mensaje);
          swal.fire('Error al Eliminar', e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
