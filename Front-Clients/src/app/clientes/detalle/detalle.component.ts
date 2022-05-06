import { ActivatedRoute } from '@angular/router';
import { ClienteService } from './../cliente.service';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  cliente!: Cliente;
  titulo: string = 'Detalle del cliente';
  private fotoSeleccionada!: File;
  nombreFoto = "Seleccionar foto";

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = +params.get('id')!;
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.nombreFoto = this.fotoSeleccionada.name;
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.clienteService
      .subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe((cliente) => {
        this.cliente = cliente;
        swal.fire(
          `Foto Cargada: ${this.cliente.foto}`,
          `La foto del cliente ${cliente.nombre} ha sido subida con Éxito`,
          'success'
        );
      });
  }
}