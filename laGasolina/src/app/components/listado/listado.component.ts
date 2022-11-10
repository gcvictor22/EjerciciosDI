import { Component, OnInit } from '@angular/core';
import { Gasolinera } from 'src/app/interfaces/gasolinera.interface';
import { ListadoService } from 'src/app/services/listado.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  listadoGasolineras : Gasolinera[] = []

  constructor(private gasolineraService : ListadoService) { }

  ngOnInit(): void {
    this.gasolineraService.getAllGasolineras().subscribe(a => {
      this.listadoGasolineras = a.ListaEESSPrecio
    })
  }

  getGasolineraImg(gas : Gasolinera){
    if (gas['Rótulo'] == 'REPSOL') {
      //https://1000marcas.net/wp-content/uploads/2020/11/Repsol-Logo.png
    }
  }

}
