import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Observer, throwError } from "rxjs"; //fetch data from backend
import { Vtype } from "../_models/vocab";
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VtypeService {

  private endpoint = 'http://127.0.0.1:8000/';
  vtypes =[] ;
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch vtype list
  getAllVtypes(): Observable<Vtype> {
    return this.http.get<Vtype>(this.endpoint + 'vtype/')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getVtype(id): Observable<Vtype> {
    return this.http.get<Vtype>(this.endpoint + 'vtype/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create vtype
  createVtype(vtype): Observable<Vtype> {
    return this.http.post<Vtype>(this.endpoint + 'vtype/', JSON.stringify(vtype), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update vtype
  updateVtype(id, vtype): Observable<Vtype> {
    return this.http.put<Vtype>(this.endpoint + 'vtype/' + id+'/', JSON.stringify(vtype), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete vtype
  deleteVtype(id){
    return this.http.delete<Vtype>(this.endpoint + 'vtype/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //FILTERING
  listFilter(value:string): Observable<any>{
    return this.http.get(this.endpoint+"vtype/" + "?search=" +value)
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
