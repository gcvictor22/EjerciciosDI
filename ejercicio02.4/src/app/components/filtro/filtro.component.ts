import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  buscarProducto = '';
  productos:string[] = ['pan', 'macarrones', 'cereales', 'cerveza', 'leche', 'mayonesa'];

  constructor() { }

  ngOnInit(): void {
  }

}