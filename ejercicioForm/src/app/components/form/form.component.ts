import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { People } from 'src/app/interfaces/people-list.interface';
import { PeopleServiceService } from 'src/app/service/people-service.service';
import { PeopleListComponent } from '../people-list-component/people-list-component.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  newCharacter: People = {} as People
  personaCargada!: PeopleListComponent;
  id=this.newCharacter.url.split('/')[5]

  addEditFormGroup = new FormGroup({
    nameFormControl: new FormControl(this.newCharacter.name, [Validators.required]),
    heightFormControl: new FormControl(this.newCharacter.height, [Validators.required]),
    hair_colorFormControl: new FormControl(this.newCharacter.hair_color, [Validators.required]),
    eye_colorFormControl: new FormControl(this.newCharacter.eye_color, [Validators.required]),
    birth_yearFormControl: new FormControl(this.newCharacter.birth_year, [Validators.required])
  });

  guardar(){
    alert("Datos guardados");
  }

  constructor(private peopleService : PeopleServiceService) {}

  ngOnInit(): void {
    this.personaCargada
  }

}
