import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/people.interface';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  peopleList : Result[] = []
  fav = true
  favorite = 'favorite_border'

  constructor(private peopleService : PeopleService) { }

  ngOnInit(): void {
    this.peopleService.getPeople().subscribe((a)=>{
      this.peopleList = a.results

      console.log(this.fav)
    })

    this.change()
  }

  getPeopleImg(p:Result){
    return 'https://image.tmdb.org/t/p/w500'+p.profile_path
  }

  change(){
    this.fav = !this.fav

    if (this.fav == false) {
      this.favorite = 'favorite_border'
    }else{
      this.favorite = 'favorite'
    }
  }

}
