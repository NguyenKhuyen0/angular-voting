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
import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from '../user-info.service';
import { CustomKeyCloak } from '../model/custom_keycloack';

@Component(
    {selector: 'app-voting', templateUrl: './voting.component.html', styleUrls: ['./voting.component.css']}
)
export class VotingComponent implements OnInit {
    @Input()voting: Voting;
    @Input()question: Question;

    options = [];
    urlMedia = environment.urlMedia;
    maso = false;
    da_binh_chon = false;
    timeout = false;

    is_login = false;
    votingRequest = new VotingRequest();
    


    constructor(
        private route : ActivatedRoute,
        private votingService : VotingService,
        private voteService : VoteService,
        private cookieService: CookieService,
        private userInfoService: UserInfoService
    ) {}


    ngOnInit(): void {

        this.getVoting();
    
        this.userInfoService.keyCloakSubject.subscribe(customKeyCloak  => {

            this.votingRequest.user_id = customKeyCloak.subject;
            this.set_is_login(customKeyCloak);
        })


        this.votingRequest = new VotingRequest();

        

        if(this.votingRequest.user_id)
        {
            this.is_login = true;
        }
        if(this.cookieService.get('options'))
        {
            this.options =  JSON.parse(this.cookieService.get('options'));
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
                    if(this.voting.questions && voting.questions['0'])
                    {
                        this.voting.questions['0']['options'] =  this.shuffle(voting.questions[0]['options']);
                   
                    }
                    this.votingRequest.voting_id = voting['_id'];
                }
            });
    }
    vote(votes : VotingRequest): void {
        this.cookieService.set( 'options', JSON.stringify(this.options) );
        console.log(this.is_login);
        if (this.is_login) {
            this
                .voteService
                .vote(votes)
                .subscribe(data => {
                    if(data.maso)
                    {
                        this.maso = data.maso;
                    }
                    // if(data.da_binh_chon)
                    console.log(data);
                    if(data.da_binh_chon)
                    {
                        this.da_binh_chon = true;
                    }
                    if(data.timeout)
                    {
                        this.timeout = true;
                    }
              
                    // console.log(data);
                    // console.log(data[0]);
                    // console.log( data.indexOf('da_binh_chon') >= 0);
                    // console.log( this.da_binh_chon);
                }); // xuất ra mã số dự thưởng của bạn là
        } else {
            this
                .userInfoService
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
    
    reset()
    {
        this.options = [];
    }
    logIn()
    {
  
        window.parent.postMessage({
            'msg': 'login'
          }, "*");
    }
    set_is_login(customKeyCloak : CustomKeyCloak)
    {
        if(!this.userInfoService.isTokenExpired(customKeyCloak))
        {
            if(customKeyCloak.authenticated)
            {
                this.is_login = true;
            }
        }
    }
    logOut()
    {
        window.parent.postMessage({
            'msg': 'logout'
          }, "*");
    }

}
