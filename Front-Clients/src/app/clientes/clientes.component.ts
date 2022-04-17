import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    let page = 0;
    this.clienteService
      .getClientes(page)
      .pipe(
        tap((response) => {
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach((cliente) => {
            console.log(cliente.nombre);
          });
        })
      )
      .subscribe(response => this.clientes = response.content as Cliente[]);
  }

  delete(cliente: Cliente): void {
    swal
      .fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      })
      .then((result) => {
        if (result.value) {
          this.clienteService.delete(cliente.id).subscribe((response) => {
            this.clientes = this.clientes.filter((cli) => cli !== cliente);
            swal.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }
}
