import { BrowserModule  } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule }    from '@angular/forms';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { OptionComponent } from './option/option.component';
import { QuestionComponent } from './question/question.component';
import { VotingComponent } from './voting/voting.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user.service';




import { KeycloakService } from 'keycloak-angular';
import { KcService, KcServiceInit } from "./initilizer";
@NgModule({
  declarations: [
    AppComponent,
    OptionComponent,
    QuestionComponent,
    VotingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    KeycloakService,
    KcService,
    {
        provide: APP_INITIALIZER,
        useFactory: KcServiceInit,
        deps: [KcService],
        multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
