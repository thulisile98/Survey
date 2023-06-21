import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  surveyForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private firestore: Firestore) {
    this.surveyForm = this.formBuilder.group({
      surname: [''],
      firstName: [''],
      contactNumber: [''],
      date: [''],
      age: [''],
      likeToEatOut: [''],
      likeToWatchMovies: [''],
      likeToWatchTV: [''],
      likeToListenToRadio: [''],
      pasta: [''],
      pizza: [''],
      papAndWors: [''],
      chickenStirFry: [''],
      beefStirFry: [''],
      otherFood: [''],
    });
  }

  onSubmit() {
    if (this.surveyForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const surveyData = this.surveyForm.value;

    console.log(surveyData);


    addDoc(collection(this.firestore, 'surveys'), surveyData)
      .then(() => {
        console.log('Survey data saved successfully!');
        console.log(surveyData);

        this.surveyForm.reset();
      })
      .catch((error) => {
        console.error('Error saving survey data: ', error);
      });
  }
}
