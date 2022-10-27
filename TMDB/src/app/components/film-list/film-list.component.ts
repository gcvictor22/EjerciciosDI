import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog.interface';
import { Film, FilmResponse } from 'src/app/interfaces/film.interface';
import { FilmService } from 'src/app/services/film.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  listadoFilms : Film[] = []
  filmSelected : Film = {} as Film

  constructor(private filmService : FilmService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe((a) => {
      this.listadoFilms = a.results
    })
  }

  getFilmImg(film : Film){
    return 'https://image.tmdb.org/t/p/w500' + film.poster_path
  }

  filmDialog(film : Film){
    this.filmService.getFilmDetails(film).subscribe((a) => {
      this.filmSelected = a
      this.dialog.open(DialogComponent, {
        data:{
          film: this.filmSelected
        }
      })
    })
  }
}