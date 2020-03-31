import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = "http://localhost/crud/"

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  getData(pathUrl: string) {
    return this.http.get(API_URL + pathUrl);
  }

  postData(pathUrl: string , data: any) {
    return this.http.post(API_URL + pathUrl, data);
  }
}
