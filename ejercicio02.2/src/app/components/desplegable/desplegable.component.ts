import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.css']
})
export class DesplegableComponent implements OnInit {

  desplegar = true;

  cambiar(){
    this.desplegar = !this.desplegar;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
