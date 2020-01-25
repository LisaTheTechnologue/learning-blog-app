import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Category } from '../_models/vocab';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private endpoint = 'http://127.0.0.1:8000/';
  categorys =[] ;
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch category list
  getAllCategorys(): Observable<Category> {
    return this.http.get<Category>(this.endpoint + 'category/')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getCategory(id): Observable<Category> {
    return this.http.get<Category>(this.endpoint + 'category/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create category
  createCategory(category): Observable<Category> {
    return this.http.post<Category>(this.endpoint + 'category/', JSON.stringify(category), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update category
  updateCategory(id, category): Observable<Category> {
    return this.http.put<Category>(this.endpoint + 'category/' + id+'/', JSON.stringify(category), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete category
  deleteCategory(id){
    return this.http.delete<Category>(this.endpoint + 'category/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //FILTERING
  listFilter(value:string): Observable<any>{
    return this.http.get(this.endpoint+"category/" + "?search=" +value)
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
