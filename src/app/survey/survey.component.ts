import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  surveyForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private firestore: Firestore, private router: Router,) {
    this.surveyForm = this.formBuilder.group({
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      date: ['', Validators.required],
      age: ['', Validators.required, Validators.min(5), Validators.max(120)],
      likeToEatOut: ['', Validators.required],
      likeToWatchMovies: ['', Validators.required],
      likeToWatchTV: ['', Validators.required],
      likeToListenToRadio: ['', Validators.required],
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
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.error('Error saving survey data: ', error);
      });
  }
}
