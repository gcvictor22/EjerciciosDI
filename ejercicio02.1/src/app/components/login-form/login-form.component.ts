import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  
  visibilidad='visibility';
  tipo = 'password';
  change = true;
  habilitar = false;

  cambiar(){
    this.change = !this.change

    if (this.change) {
      this.tipo = "password"
      this.visibilidad='visibility'
    } else {
      this.tipo = "text"
      this.visibilidad='visibility_off'
    }    
  }

  constructor() { }

  ngOnInit(): void {
  }

}