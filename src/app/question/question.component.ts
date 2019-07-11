import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../model/question';
import { QuestionService } from './question.service';
import { UserService } from '../user/user.service';
import { OptionService } from '../option/option.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location,
    private optionService: OptionService
    ) { }

  ngOnInit(): void {
    this.getQuestion();
    // console.log( this.userService.kcO());
   
  }

  getQuestion(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(id)
      .subscribe(question => {this.question = question;});
  }

  vote(i, votes):void{
    this.question.options[i].votes = votes + 1;
    this.optionService.updateOption(this.question.options[i]);
  }
  sendRequest():void{
    console.log('AAAA')
    this.questionService.getQuestions().subscribe(question => {});
  }
}
