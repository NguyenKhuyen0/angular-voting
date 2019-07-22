import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {Voting} from '../model/voting';
import {VotingService} from './voting.service';

import {Question} from '../model/question';
import {QuestionService} from '../question/question.service';
import {Option} from '../model/option';

import {UserService} from '../user/user.service';
import {VoteService} from '../vote.service';
import {VotingRequest} from '../model/votingRequest';

import {environment} from "../environment";

@Component(
    {selector: 'app-voting', templateUrl: './voting.component.html', styleUrls: ['./voting.component.css']}
)
export class VotingComponent implements OnInit {
    @Input()voting: Voting;
    @Input()question: Question;

    options = [];
    urlMedia = environment.urlMedia;

    is_login = false;
    votingRequest: VotingRequest;

    constructor(
        private userService : UserService,
        private route : ActivatedRoute,
        private votingService : VotingService,
        private location : Location,
        private voteService : VoteService
    ) {}

    ngOnInit(): void {
        this.getVoting();

        this.votingRequest = new VotingRequest();
        this.votingRequest.user_id = this
        .userService
        .userID();

        if(this.votingRequest.user_id)
        {
            this.is_login = true;
        }
    }

    getVoting() {
        const id = this
            .route
            .snapshot
            .paramMap
            .get('id');
        this
            .votingService
            .getVoting(id)
            .subscribe(voting => {
                if (voting) {
                    this.voting = voting;
                    this.question = this
                        .voting
                        .questions[0];
                    console.log(this.voting);

                    this.votingRequest.voting_id = voting['_id'];
                }
            });
    }
    vote(votes : VotingRequest): void {
        if (this.votingRequest.user_id) {
            this
                .voteService
                .vote(votes)
                .subscribe(ms => {
                    console.log(ms);
                }); // xuất ra mã số dự thưởng của bạn là
        } else {
            this
                .userService
                .logIn();
        }
    }

    chooseOption(id_option : String) {

        if (this.options) {
            this
                .options
                .push(id_option);
        } else {
            this.options = [id_option];
        }
        console.log("options ", this.options);
    }
    unChooseOption(id_option : String) {
        if (this.options) {
            var index = this
                .options
                .indexOf(id_option);
            if (index > -1) {
                this
                    .options
                    .splice(index, 1);
            }
        }
    }

    sendRequest() {
        this.votingRequest.options = this.options;
        console.log(this.votingRequest);
        this.vote(this.votingRequest);
    }
     
    shuffle(array: Array<any>) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

}
