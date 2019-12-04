import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from "@angular/core";
import { VideosService } from "src/app/services/videos.service";

@Component({
  selector: "app-videos",
  templateUrl: "./videos.component.html",
  styleUrls: ["./videos.component.scss"]
})
export class VideosComponent implements OnInit {
  @ViewChild("videoPlayer", { static: true }) videoPlayer: ElementRef;
  @Output() videosAlreadyAdded = new EventEmitter<[]>();
  @Output() selectedVideo = new EventEmitter<any>();
  videos: any = [];
  videosToWatch: any = [];
  oneColumn: boolean = false;
  twoColumns: boolean = false;
  threeColumns: boolean = true;
  fourColumns: boolean = false;
  gridSystem: string = "";
  video: HTMLVideoElement;
  addDisabled: boolean;
  removedVideoId: string;
  fullWidthVideo: boolean = false;

  constructor(private videosService: VideosService) {}

  ngOnInit() {
    this.showVideos();
  }

  showVideos() {
    this.videosService.getVideos().subscribe(data => {
      this.videos = data;
    });
  }

  addVideoToWatchlist(dataChild) {
    this.videosToWatch.push(dataChild);
  }

  checkVideosAdded(videosAlreadyAdded) {
    this.videosAlreadyAdded = this.videosToWatch;
    this.videosToWatch.emit(videosAlreadyAdded);
  }

  showVideoDetails(video) {
    this.selectedVideo = video;
    console.log(this.selectedVideo)
    this.fullWidthVideo != this.fullWidthVideo;
    return this.selectedVideo;
  }

  removeVideoFromWatchlist(videoId) {
    this.videosToWatch.forEach((video, index) => {
      if (video.id === videoId) {
        this.videosToWatch.splice(index, 1);
      }
    })
  }

  choosenGirdSystem(dataChild) {
    this.gridSystem = dataChild;
    if (this.gridSystem == "1 X 1") {
      this.oneColumn = !this.oneColumn;
      this.twoColumns = false;
      this.threeColumns = false;
      this.fourColumns = false;
    }
    if (this.gridSystem == "2 X 2") {
      this.twoColumns = !this.twoColumns;
      this.threeColumns = false;
      this.oneColumn = false;
      this.fourColumns = false;
    }
    if (this.gridSystem == "3 X 3") {
      this.threeColumns = !this.threeColumns;
      this.oneColumn = false;
      this.twoColumns = false;
      this.fourColumns = false;
    }
    if (this.gridSystem == "4 X 4") {
      this.fourColumns = !this.fourColumns;
      this.oneColumn = false;
      this.twoColumns = false;
      this.threeColumns = false;
    }
  }
}