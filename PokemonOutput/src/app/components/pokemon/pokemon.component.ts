import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/list.interface';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() pokemon : Pokemon = {} as Pokemon
  @Output() pokemonSelected = new EventEmitter<Pokemon>();

  constructor() { }

  ngOnInit(): void {
  }

  getPokemonImg(){
    let id = this.pokemon.url.split('/')[6];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  getPokemonSelected(){
    this.pokemonSelected.emit(this.pokemon)
  }

}
