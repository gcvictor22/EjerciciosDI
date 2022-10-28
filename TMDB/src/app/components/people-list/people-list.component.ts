import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { Result } from 'src/app/interfaces/people.interface';
import { PeopleDetailsResponse } from 'src/app/interfaces/peopleDetails.interface';
import { PeopleService } from 'src/app/services/people.service';
import { DialogComponent } from '../dialog/dialog.component';
import { PeopleDialogComponent } from '../people-dialog/people-dialog.component';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  peopleList: Result[] = []
  peopleSelected : PeopleDetailsResponse = {} as PeopleDetailsResponse

  constructor(private peopleService: PeopleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.peopleService.getPeople().subscribe((a) => {
      this.peopleList = a.results
    })
  }

  getPeopleImg(p: Result) {
    return 'https://image.tmdb.org/t/p/w500' + p.profile_path
  }

  peopleDialog(people : Result){
    this.peopleService.getPeopleDetails(people).subscribe((a) => {
      this.peopleSelected = a
      this.dialog.open(PeopleDialogComponent, {
        data:{
          people: this.peopleSelected
        }
      })
    })
  }
}