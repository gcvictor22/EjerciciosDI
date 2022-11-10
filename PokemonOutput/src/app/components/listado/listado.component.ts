import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/list.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit {

  listadoPokemons : Pokemon[] = [];
  pokemonSelected : Pokemon = {} as Pokemon

  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(a => {
      this.listadoPokemons = a.results;
    });
  }

  getPokemon(event : Pokemon){
    this.pokemonSelected = event
    console.log(this.pokemonSelected);
  }
}