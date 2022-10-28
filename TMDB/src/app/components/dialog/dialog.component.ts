import { Component, Inject, OnInit, PipeTransform } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogData } from 'src/app/interfaces/dialog.interface';
import { Videos } from 'src/app/interfaces/filmVideos.interface';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit, PipeTransform {

  listadoVideos: Videos[] = []
  video: Videos = {} as Videos
  url = 'https://www.youtube.com/embed/'
  key : Videos = {} as Videos
  adult=''

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private videoService: VideosService, private sanitizer: DomSanitizer) { }

  transform(v: Videos) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url + v.key);
  }

  ngOnInit(): void {
    this.videoService.getVideos(this.data.film).subscribe((a) => {
      this.listadoVideos = a.results

      this.listadoVideos.forEach(b => {
        if (b.type == 'Trailer') {
          this.key = b
        }
      });
    })
  }
}
