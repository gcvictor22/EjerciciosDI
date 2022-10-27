import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Result } from 'src/app/interfaces/people.interface';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  peopleList: Result[] = []

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.peopleService.getPeople().subscribe((a) => {
      this.peopleList = a.results
    })
  }

  getPeopleImg(p: Result) {
    return 'https://image.tmdb.org/t/p/w500' + p.profile_path
  }
}
