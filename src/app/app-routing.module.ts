import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotingComponent }      from './voting/voting.component';
import { QuestionComponent }      from './question/question.component';



const routes: Routes = [
  { path: '', component: VotingComponent },
  { path: 'voting', component: VotingComponent },
  { path: 'question', component: QuestionComponent },

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}