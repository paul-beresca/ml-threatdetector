import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  videosUrl: string = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { }

  getVideos() {
    return this.http.get(this.videosUrl);
  }
}
  