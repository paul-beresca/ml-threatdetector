import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { VideosService } from 'src/app/services/videos.service';

export class VideoData {
  id: number;
  name: string;
  videoUrl: string;
  address: string;
  long: number;
  lat: number;
  videoTime: number;
  timelineData: any[];
  timelineDuration: number;
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;
  @Output() videosAlreadyAdded = new EventEmitter<[]>();
  // @Output() fullWidthVideo : EventEmitter<string> = new EventEmitter<string>();
  videos: VideoData[] = [];
  videosToWatch: VideoData[] = [];
  selectedVideo: VideoData;
  oneColumn: boolean = false;
  twoColumns: boolean = false;
  threeColumns: boolean = false;
  fourColumns: boolean = false;
  gridSystem: string = '';
  rearm = '';
  isAThreatActive = 'inactive';
  video: HTMLVideoElement;
  addDisabled: boolean;
  removedVideoId: string;
  fullWidthVideo: any;

  constructor(private videosService: VideosService) { }

  ngOnInit() {
    this.showVideos();
  }

  dataChanged(event, videoId) {
    if (this.selectedVideo && this.selectedVideo.id === videoId) {
      this.selectedVideo.timelineData = [...event];
    }
  }

  durationChanged(event, videoId) {
    if (this.selectedVideo && this.selectedVideo.id === videoId) {
      this.selectedVideo.timelineDuration = event;
    }
  }

  showVideos() {
    this.videosService.getVideos().subscribe((data: VideoData[]) => {
      this.videos = data;
    });
  }

  addVideoToWatchlist(dataChild) {
    this.videosToWatch.push({ ...dataChild, timelineData: this.getDefaultTimeline(), timelineDuration: 0 });
  }

  selectVideo(video) {
    this.selectedVideo = this.videosToWatch.find(v => v.id === video.id);
  }

  showMainVideo(mainVideo) {
    this.fullWidthVideo = { oneGrid: '1 X 1' };
    this.videosToWatch = this.videosToWatch.filter(item => item === mainVideo);
  }

  removeVideoFromWatchlist(videoId) {
    if (videoId === this.selectedVideo.id) {
      this.selectedVideo = null;
    }

    this.videosToWatch.forEach((video, index) => {
      if (video.id === videoId) {
        this.videosToWatch.splice(index, 1);
      }
    });
  }

  isThreatActive(event) {
    this.isAThreatActive = event;
  }

  rearmSystem(event) {
    this.rearm = event;
  }

  choosenGirdSystem(dataChild) {
    this.gridSystem = dataChild;
    if (this.gridSystem == '1 X 1') {
      this.oneColumn = !this.oneColumn;
      this.twoColumns = false;
      this.threeColumns = false;
      this.fourColumns = false;
    }
    if (this.gridSystem == '2 X 2') {
      this.twoColumns = !this.twoColumns;
      this.threeColumns = false;
      this.oneColumn = false;
      this.fourColumns = false;
    }
    if (this.gridSystem == '3 X 3') {
      this.threeColumns = !this.threeColumns;
      this.oneColumn = false;
      this.twoColumns = false;
      this.fourColumns = false;
    }
    if (this.gridSystem == '4 X 4') {
      this.fourColumns = !this.fourColumns;
      this.oneColumn = false;
      this.twoColumns = false;
      this.threeColumns = false;
    }
  }

  onVideoTime(time) {
    this.selectedVideo.videoTime = time;
  }

  getDefaultTimeline() {
    return [
      ['rifle', 0, 0],
      ['pistol', 0, 0],
      ['bear', 0, 0],
    ];
  }
}
