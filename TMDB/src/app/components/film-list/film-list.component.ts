import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSessionDto } from 'src/app/dto/createSession.dto';
import { DeleteSessionDto } from 'src/app/dto/deleteSession.dto';
import { DialogData } from 'src/app/interfaces/dialog.interface';
import { Film, FilmResponse } from 'src/app/interfaces/film.interface';
import { UserSessionResponse } from 'src/app/interfaces/user-session.interface';
import { AuthServicesService } from 'src/app/services/auth-services.service';
import { FilmService } from 'src/app/services/film.service';
import { UserSessionService } from 'src/app/services/user-session.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
})
export class FilmListComponent implements OnInit {
  listadoFilms: Film[] = [];
  filmSelected: Film = {} as Film;
  reqToken = '';
  approved = false;
  userSessionLogin: UserSessionResponse = {} as UserSessionResponse;
  session_idString = '';

  constructor(
    private filmService: FilmService,
    public dialog: MatDialog,
    private authService: AuthServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private userSession: UserSessionService
  ) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe((a) => {
      this.listadoFilms = a.results;
    });

    this.route.queryParams.subscribe((qParams) => {
      const ap = qParams['approved'];
      const rToken = qParams['request_token'];
      this.approved = ap == 'true' ? true : false;

      if (this.approved) {
        let session = new CreateSessionDto();
        session.request_token = rToken;
        this.authService.createSession(session).subscribe((resp) => {
          localStorage.setItem('session_id', resp.session_id);
          console.log('Session id: ' + resp.session_id);

          this.userSession.getUserSession(resp.session_id).subscribe((a) => {
            this.userSessionLogin = a;
          });
        });
      } else {
        this.router.navigate(['/films']);
      }
    });
  }

  getFilmImg(film: Film) {
    return 'https://image.tmdb.org/t/p/w500' + film.poster_path;
  }

  filmDialog(film: Film) {
    this.filmService.getFilmDetails(film).subscribe((a) => {
      this.filmSelected = a;
      this.dialog.open(DialogComponent, {
        data: {
          film: this.filmSelected,
        },
      });
    });
  }

  login() {
    this.authService.createRequestToken().subscribe((resp) => {
      this.reqToken = resp.request_token;
      console.log(this.reqToken);
      window.location.href = `https://www.themoviedb.org/authenticate/${this.reqToken}?redirect_to=http://localhost:4200/films`;
    });
  }

  logout() {
    let deleteSession = new DeleteSessionDto();
    deleteSession.session_id = localStorage.getItem('session_id') as string;
    this.authService.logOutSession(deleteSession).subscribe((a) => {
      if (a.success) {
        localStorage.removeItem('session_id');
        window.location.href = 'http://localhost:4200/films';
      }
    });
  }

  logoutAlert(){
    Swal.fire(
      'Alerta',
      '¿Seguro que quieres cerrar sesión?',
      'question'
    )
    this.logout()
  }
}