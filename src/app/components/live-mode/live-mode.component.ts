import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-live-mode',
  templateUrl: './live-mode.component.html',
  styleUrls: ['./live-mode.component.scss']
})
export class LiveModeComponent implements OnInit, AfterViewInit {
  videoSrc: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.webcam_init();
  }

  webcam_init() {

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: 'user'
        }
      })
      .then(stream => {
        this.videoSrc = stream;
      });
  }

}
