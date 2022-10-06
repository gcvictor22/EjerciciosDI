import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/interfaces/people-list.interface';
import { PeopleServiceService } from 'src/app/service/people-service.service';

@Component({
  selector: 'app-people-list-component',
  templateUrl: './people-list-component.component.html',
  styleUrls: ['./people-list-component.component.css']
})
export class PeopleListComponentComponent implements OnInit {
  peopleListado: People[] = []


  constructor(private peopleService: PeopleServiceService) { }

  ngOnInit(): void {
    this.peopleService.peopleList().subscribe(response => {
      this.peopleListado = response.results
    })
  }

}
