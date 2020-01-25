import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LNote } from '../_models/note';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private endpoint = 'http://127.0.0.1:8000/';
  notes = [];
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API get() method => Fetch french list
  getAllFrenchs(): Observable<LNote> {
    return this.http.get<LNote>(this.endpoint + 'note/' + "?search=french")
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getAllEnglishs(): Observable<LNote> {
    return this.http.get<LNote>(this.endpoint + 'note/' + "?search=english")
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getNote(id): Observable<LNote> {
    return this.http.get<LNote>(this.endpoint + 'note/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Create french
  createNote(note): Observable<LNote> {
    return this.http.post<LNote>(this.endpoint + 'note/', JSON.stringify(note), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  httpImgOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }
  public upload(formData) {
    return this.http.post<any>(`${this.endpoint}note/photo/`, formData);
  }
  // HttpClient API put() method => Update french
  updateNote(id, note): Observable<LNote> {
    return this.http.put<LNote>(this.endpoint + 'note/' + id + '/', JSON.stringify(note), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API delete() method => Delete french
  deleteNote(id) {
    return this.http.delete<LNote>(this.endpoint + 'note/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //FILTERING
  listFilterFrench(value: string): Observable<any> {
    return this.http.get(this.endpoint + "note/" + "?search=french+" + value)
  }
  listFilterEnglish(value: string): Observable<any> {
    return this.http.get(this.endpoint + "note/" + "?search=english+" + value)
  }
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
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