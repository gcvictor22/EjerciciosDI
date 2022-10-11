import { Component, OnInit } from '@angular/core';
import { Peliculas } from 'src/app/interfaces/film-list.interface';
import { People, PeopleResponse } from 'src/app/interfaces/people-list.interface';
import { PeopleServiceService } from 'src/app/service/people-service.service';

const URL_IMAGEN = 'https://starwars-visualguide.com/assets/img/characters/'
@Component({
  selector: 'app-people-list-component',
  templateUrl: './people-list-component.component.html',
  styleUrls: ['./people-list-component.component.css']
})
export class PeopleListComponentComponent implements OnInit {
  peopleListado: People[] = []
  filmsListado: Peliculas[] = []
  numero = 1
  page = ''

  sumar(){
    this.numero++
  }

  restar(){
    this.numero--
  }

  constructor(private peopleService: PeopleServiceService) { }

  ngOnInit(): void {

    this.peopleService.peopleList(this.page).subscribe(response => {
      this.peopleListado = response.results
    })

    this.peopleService.filmList().subscribe(response => {
      this.filmsListado = response.results
    })
  }

  getObjetoUrl(objeto: People) {
    let id = objeto.url.split('/')[5];
    return `${URL_IMAGEN}${id}.jpg`
  }

}