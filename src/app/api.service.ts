import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Favorite } from "./favorite";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  public getAllFavorites(): Observable<Favorite[]> {
    return this.http.get(API_URL + "/favorites")
        .map(response => {
          return response.json();
        });
  }
}
