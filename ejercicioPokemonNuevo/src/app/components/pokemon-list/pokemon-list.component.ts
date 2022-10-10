import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon-response.interface';
import { PokemonService } from 'src/app/service/pokemon.service';
import VanillaTilt from 'vanilla-tilt';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PokemonDetailResponse } from 'src/app/interfaces/pokemon-detail-response.interface';

const URL_IMAGEN = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  listadoPokemon: Pokemon[] = []
  pokemonSelected: PokemonDetailResponse | undefined;
  img = URL_IMAGEN
  nombreBuscador=''

  constructor(private pokemonService: PokemonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pokemonService.pokemonList().subscribe(response => {
      this.listadoPokemon = response.results;
    })

    VanillaTilt.init(document.querySelectorAll('.vanillaTilt') as any)
  }
  getPokemonInfo(pokemon: Pokemon) {
    this.pokemonService.getPokemonDetail(pokemon).subscribe(response => {
      this.pokemonSelected = response;
      this.dialog.open(DialogComponent, {
        data: {
          pokemonInfo: this.pokemonSelected,
          color: '#FF0000'
        },
      });
    });
  }
}