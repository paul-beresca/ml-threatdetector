import { Component, OnInit } from '@angular/core';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {

  videos : any = [];

  constructor(private videosService: VideosService) { }

  ngOnInit() {
    this.showVideosFromJson();
  }

  showVideosFromJson() {
    this.videosService.getVideosFromJson().subscribe(videos => {
      this.videos = videos;
      console.log("this.videos", this.videos);
    })
  }

}
