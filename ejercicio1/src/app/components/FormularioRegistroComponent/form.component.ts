import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(private _formBuilder: FormBuilder) {}

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit(): void {
  }


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Introduce un email';
    }

    return this.email.hasError('email') ? 'Formato no válido' : '';
  }

  nombre='';
  apellidos='';
  dni='';
  sexo='';
  gmail='';
  telefono='';
  conocer='';
  accept=false;

  enviarDatos() {
    console.log(this.nombre)
    console.log(this.apellidos)
    console.log(this.dni)
    console.log(this.sexo)
    console.log(this.gmail)
    console.log(this.telefono)
    console.log(this.conocer)
  }
}
