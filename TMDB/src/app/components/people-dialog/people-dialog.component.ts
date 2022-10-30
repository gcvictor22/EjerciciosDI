import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeopleDialogData } from 'src/app/interfaces/dialogPeople.interface';
import { Result } from 'src/app/interfaces/people.interface';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people-dialog',
  templateUrl: './people-dialog.component.html',
  styleUrls: ['./people-dialog.component.css']
})
export class PeopleDialogComponent implements OnInit {

  peopleList : Result[] = []
  peopleSelectedById : Result = {} as Result

  constructor(@Inject(MAT_DIALOG_DATA) public data: PeopleDialogData,private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.peopleService.getPeople().subscribe((a)=>{
      this.peopleList = a.results

      this.peopleList.forEach(b => {
        if (b.id == this.data.people.id) {
          this.peopleSelectedById = b
        }
      });
    })
  }
}