import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ImageTrainToolComponent } from "./components/image-train-tool/image-train-tool.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { TensorflowExampleComponent } from "./components/tensorflow-example/tensorflow-example.component";
import { SourceListComponent } from "./components/shared/source-list/source-list.component";
import { VideosComponent } from "./components/videos/videos.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { VideoSettingsComponent } from "./components/videos/video-settings/video-settings.component";
import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import { CreditsComponent } from './components/credits/credits.component';
import { LiveModeComponent } from './components/live-mode/live-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageTrainToolComponent,
    HomeComponent,
    NavbarComponent,
    TensorflowExampleComponent,
    VideosComponent,
    SourceListComponent,
    VideosComponent,
    LandingPageComponent,
    VideoSettingsComponent,
    CreditsComponent,
    LiveModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        "pk.eyJ1Ijoic2ViYXN0aWFuaHRuIiwiYSI6ImNrM28zN2ExazA0bzgzY211YXF4anVreGEifQ.T5zBAt_wZdfDQzutdVXWLw",
      geocoderAccessToken:
        "pk.eyJ1Ijoic2ViYXN0aWFuaHRuIiwiYSI6ImNrM28zN2ExazA0bzgzY211YXF4anVreGEifQ.T5zBAt_wZdfDQzutdVXWLw"
    }),
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
