import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImageTrainToolComponent } from './components/image-train-tool/image-train-tool.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TensorflowExampleComponent } from './components/tensorflow-example/tensorflow-example.component';
import { SourceListComponent } from './components/shared/source-list/source-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageTrainToolComponent,
    HomeComponent,
    NavbarComponent,
    TensorflowExampleComponent,
    SourceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
