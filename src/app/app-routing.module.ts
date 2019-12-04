import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreditsComponent } from './components/credits/credits.component';
import { LiveModeComponent } from './components/live-mode/live-mode.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  { path: 'credits', component: CreditsComponent },
  { path: 'live-mode', component: LiveModeComponent },
  { path: 'landing', component: LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
