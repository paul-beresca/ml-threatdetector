import { Component, OnInit, Input } from '@angular/core';
import { VideosService } from 'src/app/services/videos.service';
@Component({
  selector: 'app-video-settings',
  templateUrl: './video-settings.component.html',
  styleUrls: ['./video-settings.component.scss']
})
export class VideoSettingsComponent implements OnInit {
  @Input() videoSettings;
  location: Location;

  constructor(private videoService: VideosService) {}

  ngOnInit() {
    // this.location = {
    //   longitude: this.videoSettings.long,
    //   latitude: this.videoSettings.lat,
    // };
  }

  sendMessage() {
    console.log('Entered message function');
    const numbers = ['40742188066', '40751778431', '40740421159'];
    const objToSend = {
      user: 'paul.beresca',
      pass: 'pk5C39bGS6Z6dC4',
      dela: 'Engage',
      mesaj: 'Acesta este un mesaj de test api de la Paul!'
    };
    const mesaj = objToSend.mesaj.replace(/\s+/g, '+');
    numbers.map(number => {
      this.videoService.messageCall(objToSend, mesaj, number);
    });
        // tslint:disable-next-line:max-line-length
    // console.log(`https://www.whosms.ro/send.php?user=${objToSend.user}&pass=${objToSend.pass}&catre=${objToSend.catre}&dela=${objToSend.dela}&mesaj=${mesaj}`);
    console.log('Message Sent!');
  }
}

interface Location {
  latitude: number;
  longitude: number;
}
