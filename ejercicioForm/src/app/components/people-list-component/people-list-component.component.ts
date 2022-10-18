import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Peliculas } from 'src/app/interfaces/film-list.interface';
import {
  People,
  PeopleResponse,
} from 'src/app/interfaces/people-list.interface';
import { PeopleServiceService } from 'src/app/service/people-service.service';

const URL_IMAGEN = 'https://starwars-visualguide.com/assets/img/characters/';
@Component({
  selector: 'app-people-list',
  templateUrl: './people-list-component.component.html',
  styleUrls: ['./people-list-component.component.css'],
})
export class PeopleListComponent implements OnInit {
  peopleListado: People[] = [];
  filmsListado: Peliculas[] = [];
  numPages = 0;
  newCharacter: People = {} as People

  constructor(private peopleService: PeopleServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getPeoplePage(1);
  }

  getPeoplePage(page: number) {
    this.peopleService.peopleList(page).subscribe((response) => {
      this.peopleListado = response.results;
      this.numPages = Math.ceil(response.count / 10);
    });

    this.peopleService.filmList().subscribe((response) => {
      this.filmsListado = response.results;
    });
  }

  getObjetoUrl(objeto: People) {
    let id = objeto.url.split('/')[5];
    return `${URL_IMAGEN}${id}.jpg`;
  }

  counter() {
    return new Array(this.numPages);
  }

  cargarDatos(people: People) {
    this.newCharacter.name = people.name
    this.newCharacter.eye_color = people.eye_color
    this.newCharacter.hair_color = people.hair_color
    this.newCharacter.height = people.height
    this.newCharacter.birth_year = people.birth_year
  }
}