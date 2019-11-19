import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { VideosService } from "src/app/services/videos.service";
import { MatRadioModule } from "@angular/material/radio";

@Component({
  selector: "app-source-list",
  templateUrl: "./source-list.component.html",
  styleUrls: ["./source-list.component.scss"]
})
export class SourceListComponent implements OnInit {
  choosenGrid: string;
  gridSystems: any[] = [
    { gridSystem: "1 X 1", checked: true },
    { gridSystem: "2 X 2", checked: false },
    { gridSystem: "3 X 3", checked: false },
    { gridSystem: "4 X 4", checked: false },
  ];
  videos: any = [];
  @Output() videosToWatch = new EventEmitter<[]>();
  @Output() emitChoosenGrid = new EventEmitter<[]>();

  constructor(private videosService: VideosService) {}

  ngOnInit() {
    this.showVideosFromJson();
  }

  showVideosFromJson() {
    this.videosService.getVideosFromJson().subscribe(videos => {
      this.videos = videos;
      console.log("this.videos", this.videos);
    });
  }

  addVideoToWatchlist(data) {
    this.videosToWatch.emit(data);
  }

  choosenGirdSystem(choosenGrid) {
    this.emitChoosenGrid.emit(choosenGrid);
    console.log(choosenGrid);
  }
}
