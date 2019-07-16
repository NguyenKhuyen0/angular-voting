import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Question} from '../model/question';
import {VotingRequest} from '../model/votingRequest';

import {QuestionService} from './question.service';
import {UserService} from '../user/user.service';
import {VoteService} from '../vote.service';
import {from} from 'rxjs';

@Component(
    {selector: 'app-question', templateUrl: './question.component.html', styleUrls: ['./question.component.css']}
)
export class QuestionComponent implements OnInit {
    @Input()question: Question;
    @Input()id_user: String;

    votingRequest : VotingRequest;

    constructor(
        private userService : UserService,
        private route : ActivatedRoute,
        private questionService : QuestionService,
        private location : Location,
        private voteService : VoteService
    ) {}

    ngOnInit(): void {
        this.getQuestion();
        this.votingRequest.id_user = this
        .userService
        .userID();

    }

    getQuestion(): void {
        const id = this
            .route
            .snapshot
            .paramMap
            .get('id');
        this
            .questionService
            .getQuestion(id)
            .subscribe(question => {
                this.question = question;
                this.votingRequest.id_voting = this.question.id_voting;
            });
    }

    vote(votes : VotingRequest): void {
        if (this.votingRequest.id_user) {
            this
                .voteService
                .vote(votes)
                .subscribe(ms => {}); // xuất ra mã số dự thưởng của bạn là
        } else {
            this
                .userService
                .logIn();
        }
    }

    createVotingRequest(id_option : String) {
     
      
    }



}
