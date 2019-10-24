import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImageTrainToolComponent } from "./components/image-train-tool/image-train-tool.component";
import { HomeComponent } from "./components/home/home.component";
import { TensorflowExampleComponent } from "./components/tensorflow-example/tensorflow-example.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "imagetool", component: ImageTrainToolComponent },
  { path: "tensorFlowExample", component: TensorflowExampleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
