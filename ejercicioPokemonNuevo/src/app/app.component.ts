import { Component } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.vanillaTilt') as any)
  }
  title = 'EjercicioPokemon';
}
