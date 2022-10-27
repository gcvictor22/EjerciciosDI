import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  hora !: number
  contador = interval(1000)
  audio = new Audio()

  constructor() { }

  ngOnInit(): void {

    this.contador.subscribe((a) => {
      this.hora = a
    })

    this.audio.src = "https://s31.aconvert.com/convert/p3r68-cdx67/d1lw1-9ar6b.mp3"
    this.audio.load()
  }

  reproducir(){
    this.audio.play()
  }
}
