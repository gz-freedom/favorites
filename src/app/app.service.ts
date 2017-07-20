import { Injectable } from '@angular/core';
import { Favorite } from "./favorite";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AppService {
  lastId: number = 0;

  constructor(
    private api: ApiService
  ) { }

  getAllFavorites(): Observable<Favorite[]> {
    return this.api.getAllFavorites();
  }

  getAllTags(): Observable<string[]> {
    return this.api.getAllTags();
  }

  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.api.addFavorite(favorite);
  }

  addTag(tag: string): Observable<string> {
    return this.api.addTag(tag);
  } 
}
