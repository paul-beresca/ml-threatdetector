import { Component, OnInit } from "@angular/core";
import { VideosService } from "src/app/services/videos.service";

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.scss"]
})
export class VideosComponent implements OnInit {
  videos: any = [];
  videosToWatch: any = [];
  oneColumn: boolean = true;
  twoColumns: boolean = false;
  threeColumns: boolean = false;
  fourColumns: boolean = false;
  gridSystem: string = "";

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

  addVideoToWatchlist(dataChild) {
    this.videosToWatch.push(dataChild);
    console.log("videosTowatch", this.videosToWatch);
  }

  choosenGirdSystem(dataChild) {
    this.gridSystem = dataChild;
    console.log("gridSystem", this.gridSystem);
    if (this.gridSystem[Object.keys(this.gridSystem)[0]] === "1 X 1") {
      this.oneColumn = !this.oneColumn;
      this.twoColumns = false;
      this.threeColumns = false;
      this.fourColumns = false;
    }
    if (this.gridSystem[Object.keys(this.gridSystem)[0]] === "2 X 2") {
      this.twoColumns = !this.twoColumns;
      this.threeColumns = false;
      this.oneColumn = false;
      this.fourColumns = false;
    }
    if (this.gridSystem[Object.keys(this.gridSystem)[0]] === "3 X 3") {
      this.threeColumns = !this.threeColumns;
      this.oneColumn = false;
      this.twoColumns = false;
      this.fourColumns = false;
    }
    if (this.gridSystem[Object.keys(this.gridSystem)[0]] === "4 X 4") {
      this.fourColumns = !this.fourColumns;
      this.oneColumn = false;
      this.twoColumns = false;
      this.threeColumns = false;
    }
  }

  // twoColumnClass() {
  //   if (this.gridSystem === "2 X 2") {
  //     this.twoColumns = !this.twoColumns;
  //     this.threeColumns = false;
  //     this.fourColumns = false;
  //   }
  // }
  // threeColumnClass() {
  //   if (this.gridSystem === "3 X 3") {
  //     this.threeColumns = !this.threeColumns;
  //     this.twoColumns = false;
  //     this.fourColumns = false;
  //   }
  // }
  // fourColumnClass() {
  //   if (this.gridSystem === "4 X 4") {
  //     this.fourColumns = !this.fourColumns;
  //     this.twoColumns = false;
  //     this.threeColumns = false;
  //   }
  // }
}
