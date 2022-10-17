import { STRING_TYPE } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ability, PokemonDetailResponse, Species } from 'src/app/interfaces/pokemon-detail-response.interface';
import { DialogData } from 'src/app/interfaces/pokemon-dialog.interface';
import { Pokemon, PokemonResponse } from 'src/app/interfaces/pokemon-response.interface';
import VanillaTilt from 'vanilla-tilt';

const URL_IMAGEN = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  listadoPokemon: Pokemon[] = []
  random = Math.trunc(Math.random() * (20 - 5) + 5)
  lugar = this.getLocation()
  img = URL_IMAGEN
  olo = true

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.vanillaTilt') as any)
  }

  getDamage(pokemon : PokemonDetailResponse){
    return Math.trunc((pokemon.base_experience)/3+(4.5))
  }

  getRandomBoolean(pokemon : PokemonDetailResponse){

    if (pokemon.id == Math.trunc(Math.random() * (51 - 1) + 1)) {
      return this.olo == false
    }
    return this.olo = true
  }

  getLocation(){
    let numero = Math.trunc(Math.random()*(6 - 1) + 1)
    let lugar

    switch (numero) {
      case 1:
      lugar = 'en tu puta casa'
        break;
    
      case 2:
      lugar = 'en el epasio eteriol'
        break;

      case 3:
      lugar = 'en el guadalquivir'
        break;

      case 4:
      lugar = 'en tu corason'
        break;

      case 5:
      lugar = 'en la H, no estoy hablando de Houston De la cabeza a pies filotea o de Louis Vuitton Frontean de hotele y tos son de Groupon'
        break;
    }
    return lugar
  }

}
