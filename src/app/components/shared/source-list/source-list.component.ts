import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { VideosService } from "src/app/services/videos.service";

@Component({
  selector: "app-source-list",
  templateUrl: "./source-list.component.html",
  styleUrls: ["./source-list.component.scss"]
})
export class SourceListComponent implements OnInit {
  @Output() videosToWatch = new EventEmitter<[]>();
  @Output() emitChoosenGrid = new EventEmitter<[]>();
  @Output() emitRemovedVideo = new EventEmitter<string>();
  @Input() addedVideos;
  @Input() oneColumnGrid;
  choosenGrid: string = "1 X 1";
  gridSystems = ["1 X 1", "2 X 2", "3 X 3", "4 X 4"];
  videoDisabled: boolean = false;
  videos: any = [];

  constructor(private videosService: VideosService) {}

  ngOnChanges(changes): void {
    if (changes.oneColumnGrid && this.oneColumnGrid) {
      this.choosenGrid = this.oneColumnGrid.oneGrid;
      this.emitChoosenGrid.emit(this.choosenGrid)
    }
  }

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

  removeVideoFromWatchlist(id) {
    this.emitRemovedVideo.emit(id);
  }

  choosenGirdSystem(choosenGrid) {
    this.emitChoosenGrid.emit(choosenGrid);
  }
}
