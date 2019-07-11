import { InMemoryDbService } from 'angular-in-memory-web-api';
import {  Question } from './model/question';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const questions = [
      { id: "11", question: 'Dr A', options : [{id: "15", title : "option A0", votes: 25, active: true}, {id:"18", title : "option A1", votes: 26, active: true},  {id:"101", title : "option A2", votes: 27, active: false}],active: true },
      { id: "12", question: 'Dr B', options : [{id: "16", title : "option B0", votes: 25, active: true}, {id:"19", title : "option B1", votes: 26, active: true}],active: true },
      { id: "13", question: 'Dr C', options : [{id: "17", title : "option C0", votes: 25, active: true}, {id:"20", title : "option C1", votes: 26, active: true}],active: true}
    ]
    return {questions};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(questions: Question[]): number {
  //   return questions.length > 0 ? Math.max(...questions.map(question => question.id)) + 1 : 11;
  // }
}