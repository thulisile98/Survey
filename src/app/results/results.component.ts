import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  surveys: any[] = [];
  totalSurveyCount = 0;
  pizzaLoversCount = 0;
  pastaLoversCount = 0;
  papWorsLoversCount = 0;

  constructor(private firestore: Firestore) {

    const surveysCollection = collection(this.firestore, 'surveys');

    collectionData(surveysCollection).subscribe((data: any[]) => {
      this.surveys = data;
      console.log('Retrieved survey data:', this.surveys);

      this.totalSurveyCount = this.surveys.length;
      console.log('the total number of people who took the surv', this.totalSurveyCount)

      this.pizzaLoversCount = this.surveys.filter(survey => survey.pizza).length;
      console.log('pizza lovers', (this.pizzaLoversCount / this.totalSurveyCount) * 100, '%');

      this.pastaLoversCount = this.surveys.filter(survey => survey.pasta).length;
      console.log('pizza lovers', (this.pastaLoversCount / this.totalSurveyCount) * 100, '%');


      this.papWorsLoversCount = this.surveys.filter(survey => survey.papAndWors).length;
      console.log('pap & wors lovers', (this.papWorsLoversCount / this.totalSurveyCount) * 100, '%');

    });
  }
}
