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
  averageRating: number = 0;
  eatOutAverageRating: number = 0;
  movieAverageRating: number = 0;
  tvAverageRating: number = 0;
  radioAverageRating: number = 0;
  oldestAge: number = 0;
  youngestAge: number = 0;
  averageAge: number = 0;

  constructor(private firestore: Firestore) {

    const surveysCollection = collection(this.firestore, 'surveys');

    collectionData(surveysCollection).subscribe((data: any[]) => {
      this.surveys = data;
      console.log('Retrieved survey data:', this.surveys);

      this.totalSurveyCount = this.surveys.length;
      console.log('the total number of people who took the survey:', this.totalSurveyCount)

      this.pizzaLoversCount = this.surveys.filter(survey => survey.pizza).length;
      console.log('Pizza lovers:', (this.pizzaLoversCount / this.totalSurveyCount) * 100, '%');

      this.pastaLoversCount = this.surveys.filter(survey => survey.pasta).length;
      console.log('Pasta lovers:', (this.pastaLoversCount / this.totalSurveyCount) * 100, '%');

      this.papWorsLoversCount = this.surveys.filter(survey => survey.papAndWors).length;
      console.log('Pap & wors lovers:', (this.papWorsLoversCount / this.totalSurveyCount) * 100, '%');

      const eatOutSurveys = this.surveys.filter(survey => survey.likeToEatOut !== undefined);
      const totalEatOutRating = eatOutSurveys.reduce((sum, survey) => sum + parseInt(survey.likeToEatOut), 0);
      this.eatOutAverageRating = totalEatOutRating / eatOutSurveys.length;
      console.log('Average rating of people who like to eat out:', this.eatOutAverageRating);

      const movieSurveys = this.surveys.filter(survey => survey.likeToWatchMovies !== undefined);
      const totalMovieRating = movieSurveys.reduce((sum, survey) => sum + parseInt(survey.likeToWatchMovies), 0);
      this.movieAverageRating = totalMovieRating / movieSurveys.length;
      console.log('Average rating of people who like to watch movies:', this.movieAverageRating);

      const tvSurveys = this.surveys.filter(survey => survey.likeToWatchTV !== undefined);
      const totalTVRating = tvSurveys.reduce((sum, survey) => sum + parseInt(survey.likeToWatchTV), 0);
      this.tvAverageRating = totalTVRating / tvSurveys.length;
      console.log('Average rating of people who like to watch TV:', this.tvAverageRating);

      const radioSurveys = this.surveys.filter(survey => survey.likeToListenToRadio !== undefined);
      const totalRadioRating = radioSurveys.reduce((sum, survey) => sum + parseInt(survey.likeToListenToRadio), 0);
      this.radioAverageRating = totalRadioRating / radioSurveys.length;
      console.log('Average rating of people who like to listen to the radio:', this.radioAverageRating);


      this.oldestAge = Math.max(...this.surveys.map(survey => survey.age));
      console.log('Oldest age:', this.oldestAge);


      this.youngestAge = Math.min(...this.surveys.map(survey => survey.age));
      console.log('Youngest age:', this.youngestAge);

      const totalAge = this.surveys.reduce((sum, survey) => sum + survey.age, 0);
      this.averageAge = totalAge / this.totalSurveyCount;
      console.log('Average age:', this.averageAge);
    });
  }
}
