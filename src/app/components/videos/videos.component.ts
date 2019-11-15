import { Component, OnInit } from "@angular/core";
import { VideosService } from "src/app/services/videos.service";

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.scss"]
})
export class VideosComponent implements OnInit {

  videos : any = [];
  twoColumns: boolean = true;
  threeColumns: boolean = false;
  fourColumns: boolean = false;

  constructor(private videosService: VideosService) {}

  ngOnInit() {
    this.showVideos();
  }

  showVideos() {
    this.videosService.getVideos().subscribe(data => {
      this.videos = data;
      console.log("data", data);
    });
  }

  twoColumnClass() {
    this.twoColumns = !this.twoColumns;
    this.threeColumns = false;
    this.fourColumns = false;
  }
  threeColumnClass() {
    this.threeColumns = !this.threeColumns;
    this.twoColumns = false;
    this.fourColumns = false;
  }
  fourColumnClass() {
    this.fourColumns = !this.fourColumns;
    this.twoColumns = false;
    this.threeColumns = false;
  }

}
