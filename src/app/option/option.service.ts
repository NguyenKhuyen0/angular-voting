import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Option } from '../model/option';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private optionsUrl = environment.optionsUrlAPI;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  vote(id : String, id_user : String): Observable<any> {
    return this.http.put(environment.voteUrl + '/' + id, {'id_user' : id_user}, httpOptions).pipe(
      tap(_ => this.log(`vote`)),
      catchError(this.handleError<any>('vote'))
    );
  }

  updateOption (option: Option): Observable<any> {
    // console.log('update votes');
    return this.http.put(this.optionsUrl, option, httpOptions).pipe(
      tap(_ => this.log(`updated question id=${option}`)),
      catchError(this.handleError<any>('updateQuestion'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a QuestionService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QustionService: ${message}`);
  }
}
