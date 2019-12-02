import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-video-settings",
  templateUrl: "./video-settings.component.html",
  styleUrls: ["./video-settings.component.scss"]
})
export class VideoSettingsComponent implements OnInit {
  @Input() videoSettings;
  location: Location;

  constructor() {}

  ngOnInit() {
    // this.location = {
    //   longitude: this.videoSettings.long,
    //   latitude: this.videoSettings.lat,
    // };
  }
}

interface Location {
  latitude: number;
  longitude: number;
}
