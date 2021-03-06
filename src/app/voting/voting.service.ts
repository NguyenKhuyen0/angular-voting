import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Voting } from '../model/voting';
import { MessageService } from '../message.service';
import { environment } from '../environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class VotingService {

  private votingUrlAPI = environment.votingUrlAPI;  // URL to web api


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Question by id. Will 404 if id not found */
  getVoting(id: string): Observable<Voting> {
    const url = `${this.votingUrlAPI}/${id}`;
    return this.http.get<Voting>(url).pipe(
      tap(_ => this.log(`fetched voting id=${id}`)),
      catchError(this.handleError<Voting>(`getVoting id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
