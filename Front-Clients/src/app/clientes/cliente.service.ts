import swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:5000/api/clientes';
  private httpHeaders =  new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    //return of(ClientesJson);
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
    .pipe(
      catchError(e  =>{
        console.log(e.error.error);
        swal.fire('Error al Crear', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    .pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        swal.fire('Error al Editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    .pipe(
      catchError(e  =>{
        console.log(e.error.mensaje);
        swal.fire('Error al Editar', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe(
      catchError(e  =>{
        console.log(e.error.mensaje);
        swal.fire('Error al Eliminar', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
