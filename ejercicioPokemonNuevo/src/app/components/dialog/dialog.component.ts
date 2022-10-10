import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ability } from 'src/app/interfaces/pokemon-detail-response.interface';
import { DialogData } from 'src/app/interfaces/pokemon-dialog.interface';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.vanillaTilt') as any)
  }

  getAbilities(abilities: Ability[]) {
    return 
  }

}
