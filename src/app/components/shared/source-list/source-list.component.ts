import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { VideosService } from "src/app/services/videos.service";

@Component({
  selector: "app-source-list",
  templateUrl: "./source-list.component.html",
  styleUrls: ["./source-list.component.scss"]
})
export class SourceListComponent implements OnInit {
  choosenGrid: string = "1 X 1";
  gridSystems = ["1 X 1", "2 X 2", "3 X 3", "4 X 4"];
  videos: any = [];
  videoDisabled: boolean = false;
  @Output() videosToWatch = new EventEmitter<[]>();
  @Output() emitChoosenGrid = new EventEmitter<[]>();
  @Input() addedVideos;

  constructor(private videosService: VideosService) {}

  ngOnInit() {
    this.showVideosFromJson();
  }

  showVideosFromJson() {
    this.videosService.getVideosFromJson().subscribe(videos => {
      this.videos = videos;
    });
  }

  addVideoToWatchlist(data) {
    this.videosToWatch.emit(data);
  }

  checkDisabled(videoId) {
    return this.addedVideos.find(video => video.id === videoId);
  }

  choosenGirdSystem(choosenGrid) {
    this.emitChoosenGrid.emit(choosenGrid);
  }
}
