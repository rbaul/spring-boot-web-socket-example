import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = '/api/product/generator/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AutoGenerationService {

  constructor(private http: HttpClient) { }

  isAutoGenerate(): Observable<boolean> {
    return this.http.get<boolean>(API_URL);
  }

  updateAutoGenerationFlag(autoGenerationFlag: boolean): Observable<any> {
    return this.http.post(API_URL, autoGenerationFlag, httpOptions);
  }
}
