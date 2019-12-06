import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideosService } from 'src/app/services/videos.service';

@Component({
  selector: 'app-video-settings',
  templateUrl: './video-settings.component.html',
  styleUrls: ['./video-settings.component.scss']
})
export class VideoSettingsComponent implements OnInit {
  @Input() videoSettings;
  @Input() threatDetected;
  @Output() rearm = new EventEmitter();

  constructor(private videoService: VideosService) {}

  ngOnInit() {}

  rearmSystem() {
    this.threatDetected = 'inactive';
    this.rearm.emit('rearm');
  }

  sendMessage() {
    if (this.threatDetected == 'inactive') {
      return;
    }
    const numbers = ['40742188066', '40751778431', '40740421159'];

    const objToSend = {
      user: 'paul.beresca',
      pass: 'pk5C39bGS6Z6dC4',
      dela: 'Engage',
      mesaj: 'This is a message from ENGAGE! A possible threat has been detected in your area! Please seek cover!'
    };
    const mesaj = objToSend.mesaj.replace(/\s+/g, '+');
    numbers.map(number => {
      this.videoService.messageCall(objToSend, mesaj, number);
    });
  }
}
