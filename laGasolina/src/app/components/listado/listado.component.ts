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
    if (gas['Rótulo'] === 'REPSOL') {
      return 'https://1000marcas.net/wp-content/uploads/2020/11/Repsol-Logo.png'
    }else if(gas['Rótulo'] === 'CARREFOUR'){
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/245px-Carrefour_logo.svg.png'
    }else if(gas['Rótulo'] === 'CEPSA'){
      return 'https://play-lh.googleusercontent.com/LKB7R0mxT48Hhc64pr78kxWKVHU5QPfa4hqa5iO4whm_PFxX9jPwlxDGfVwIPEKGGHE'
    }else if(gas['Rótulo'] === 'BP ROMICA' || gas['Rótulo'] === 'BP'){
      return 'https://media.cylex.es/companies/1327/0019/logo/logo44036998.jpg'
    }else if(gas['Rótulo'] === 'PLENOIL'){
      return 'https://pbs.twimg.com/profile_images/1053208937003208704/8kuLex7u_400x400.jpg'
    }else{
      return 'https://www.pnguniverse.com/wp-content/uploads/2020/09/Icono-gasolinera.png'
    }
  }

}
