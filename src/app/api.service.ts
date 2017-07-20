import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Favorite } from "./favorite";
import { Tag } from "./tag";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/concatMap";

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
  
  public addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post(API_URL + "/favorites", favorite)
          .map(response => {
            return new Favorite(response.json());
          });
  }
  
  public getAllTags(): Observable<Tag[]> {
    return this.http.get(API_URL + "/tags")
        .map(response => {
          return response.json();
        });
  }
  
  public addTag(tag): Observable<string> {
    return this.http.put(API_URL + "/tags", tag)
        .map(response => response.json());
  }

  public getFavoriteById(id: number): Observable<Favorite> {
    return this.http.get(API_URL + "/favorites/" + id)
        .map(response => {
          return response.json();
        });
  }

  public getFavoritesByTag(tagName: string): Observable<Favorite[]> {
    return this.http.get(API_URL + "/tags?name=" + tagName)
            .concatMap(response => {
              let articleIds = response.json()[0].articleIds;
              let idsArray = [];
              idsArray = articleIds.map(id => {
                return "id=" + id;
              });
              let idsStr = "?" + idsArray.join("&");
              return this.http.get(API_URL + "/favorites" + idsStr).map(res => {
                return res.json();
              });
            });
  }
}
