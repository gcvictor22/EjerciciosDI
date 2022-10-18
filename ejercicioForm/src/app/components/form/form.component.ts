import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { People } from 'src/app/interfaces/people-list.interface';
import { PeopleService } from 'src/app/service/people-service.service';
import { PeopleListComponent } from '../people-list-component/people-list-component.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  newCharacter: People = {} as People
  personaCargada!: PeopleListComponent

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

  constructor(private peopleService : PeopleService, private router: Router) {}

  ngOnInit(): void {
    let id = this.router.url.split('/')[2]
    this.peopleService.getPeople(id).subscribe((resp)=>{
      this.addEditFormGroup.controls['nameFormControl'].setValue(resp.name)
      this.addEditFormGroup.controls['heightFormControl'].setValue(resp.height)
      this.addEditFormGroup.controls['hair_colorFormControl'].setValue(resp.hair_color)
      this.addEditFormGroup.controls['eye_colorFormControl'].setValue(resp.eye_color)
      this.addEditFormGroup.controls['birth_yearFormControl'].setValue(resp.birth_year)
    });
  }

}
