import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Observer, throwError } from "rxjs"; //fetch data from backend
import { Vocab,PostVocab } from "../_models/vocab";
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VocabService {

  private endpoint = 'http://127.0.0.1:8000/';
  vocabs =[] ;
  page = "";
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch vocab list
  getAllVocabs(): Observable<Vocab> {
    
    return this.http.get<Vocab>(this.endpoint + 'vocab/')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getVocab(id): Observable<Vocab> {
    return this.http.get<Vocab>(this.endpoint + 'vocab/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create vocab
  createVocab(vocab): Observable<PostVocab> {
    return this.http.post<PostVocab>(this.endpoint + 'vocab/', JSON.stringify(vocab), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update vocab
  updateVocab(id, vocab): Observable<Vocab> {
    return this.http.put<Vocab>(this.endpoint + 'vocab/' + id+'/', JSON.stringify(vocab), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete vocab
  deleteVocab(id){
    return this.http.delete<Vocab>(this.endpoint + 'vocab/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //FILTERING
  listFilter(value:string): Observable<any>{
    return this.http.get<Vocab>(this.endpoint + 'vocab/' + "?search=" +value)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
