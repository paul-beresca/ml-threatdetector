import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class VideosService {
  videosUrl: string = "https://jsonplaceholder.typicode.com/users";
  videosJson = "../../assets/VideoSources/data-videos.json";

  constructor(private http: HttpClient) {}

  getVideos() {
    return this.http.get(this.videosUrl);
  }

  getVideosFromJson() {
    return this.http.get(this.videosJson);
  }

  messageCall(objToSend, mesaj, number) {
    // tslint:disable-next-line:max-line-length
    return this.http
      .get(
        `https://www.whosms.ro/send.php?user=${objToSend.user}&pass=${objToSend.pass}&catre=${number}&dela=${objToSend.dela}&mesaj=${mesaj}`
      )
      .subscribe(data => {
        console.log("data", data);
      });
  }
}
