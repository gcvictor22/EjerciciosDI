import { Component, OnInit, Type } from '@angular/core';
import { DetailsResponse, Stat, Tipo } from 'src/app/interfaces/pokemon-details.interface';
import { Pokemon, PokemonResponse } from 'src/app/interfaces/pokemon-response.interface';
import { PokemonService } from 'src/app/service/pokemon.service';

const URL_IMAGEN = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  listadoPokemon: Pokemon[] = []
  listadoTipos: Tipo [] = [] 
  listadoHP: Stat[] = []
  listadoDetailResponse : DetailsResponse [] = []
  img = URL_IMAGEN
  nombreBuscador=''

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.pokemonList().subscribe(response => {
      this.listadoPokemon = response.results;
    })

    this.pokemonService.detailList().subscribe(response =>{
      this.listadoTipos = response.types;
    })

    this.pokemonService.detailList().subscribe(response =>{
      this.listadoHP = response.stats;
    })
  }

  getPokemonId(pokemon: Pokemon){
    return pokemon.url.split('/')[6];
  }

  getPokemonUrl(pokemon: Pokemon) {
    let id =this.getPokemonId(pokemon);
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+id+'.png'
  }

}