import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../question';
import { QuestionService } from '../question.service';
import { Option } from '../option';
import { UserService } from '../user.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() options : Array<Option>;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.getQuestion();
   
    this.userService.logIn();
  }

  getQuestion(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(id)
      .subscribe(question => {this.question = question; this.options = question.options});
  }
  
//  save(): void {
//     this.questionService.updateQuestion(this.question)
//         .subscribe(() => this.goBack());
//   }
//   goBack(): void {
//     this.location.back();
//   }
  vote(i, votes):void{
    this.question.options[i].votes = votes + 1;
    this.questionService.updateQuestion(this.question);
    // console.log(this.userService.isLogin());
    // .subscribe(() => this.goBack());
  }
}
