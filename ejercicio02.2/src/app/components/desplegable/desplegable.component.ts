import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.css']
})
export class DesplegableComponent implements OnInit {

  desplegar = true;
  flecha = 'keyboard_arrow_down';

  cambiar(){
    this.desplegar = !this.desplegar;

    if (this.desplegar) {
      this.flecha = 'keyboard_arrow_down';
    } else {
      this.flecha = 'keyboard_arrow_up'
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
