import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonResponse } from 'src/app/interfaces/pokemon-response.interface';
import { PokemonService } from 'src/app/service/pokemon.service';
import VanillaTilt from 'vanilla-tilt';

const URL_IMAGEN = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  listadoPokemon: Pokemon[] = []
  img = URL_IMAGEN
  nombreBuscador=''

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.pokemonList().subscribe(response => {
      this.listadoPokemon = response.results;
    })

    VanillaTilt.init(document.querySelectorAll('.vanillaTilt') as any)
  }

}