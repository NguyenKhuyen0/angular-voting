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
    @Input()user_id: String;

    votingRequest : VotingRequest;
    options : Array<String>;

    constructor(
        private userService : UserService,
        private route : ActivatedRoute,
        private questionService : QuestionService,
        private location : Location,
        private voteService : VoteService
    ) {}

    ngOnInit(): void {
        this.getQuestion();
        console.log(this
            .userService
            .userID());
        this.votingRequest = new VotingRequest();
        this.votingRequest.user_id = this
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
                if(question)
                {

                    this.question = question;
                    this.votingRequest.voting_id = this.question.voting_id;
                }
                console.log(question)
            });
    }

    vote(votes : VotingRequest): void {
        if (this.votingRequest.user_id) {
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

    chooseOption(id_option : String)
    {
        if(this.options)
        {
            this.options.push(id_option);
        }
        else
        {
            this.options = [id_option];
        }
        console.log("options ", this.options);
    }

    sendRequest()
    {
        this.votingRequest.options = this.options;
        console.log(this.votingRequest);
        this.vote(this.votingRequest);
    }

}
