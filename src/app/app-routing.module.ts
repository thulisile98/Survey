import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SurveyComponent } from './survey/survey.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'results', component: ResultsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
