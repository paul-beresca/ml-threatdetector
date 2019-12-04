import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TensorflowExampleComponent } from './components/tensorflow-example/tensorflow-example.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreditsComponent } from './components/credits/credits.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  { path: 'credits', component: CreditsComponent },
  { path: 'tensorFlowExample', component: TensorflowExampleComponent },
  { path: 'landing', component: LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
