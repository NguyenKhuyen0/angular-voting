import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../model/question';
import { QuestionService } from '../question/question.service';
import { Option } from '../model/option';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  @Input() question: Question;
  @Input() options : Array<Option>;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getQuestion();
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
    
    // .subscribe(() => this.goBack());
  }
}
