import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResQuestion, IUserDecisions } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  API_URL = 'http://localhost:5000/api';
  private http = inject(HttpClient);

  constructor() {}

  getQuestions() {
    return this.http.get(`${this.API_URL}/Question`);
  }
  getQuestion(questionId: number) {
    return this.http.get<IResQuestion>(
      `${this.API_URL}/Question/${questionId}`
    );
  }
}
