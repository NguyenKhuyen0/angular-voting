import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../model/question';
import { Option } from '../model/option';

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
  @Input() id_user: String;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location,
    private optionService: OptionService
    ) { }

  ngOnInit(): void {
    this.getQuestion();
    this.id_user = this.userService.userID();
   
  }

  getQuestion(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(id)
      .subscribe(question => {this.question = question;});
  }

  vote(id : String, id_user : String):void{
  
    this.optionService.vote(id, id_user).subscribe();
  }
  sendRequest():void{
    console.log('AAAA')
    this.questionService.getQuestions().subscribe(question => {});
  }
}
