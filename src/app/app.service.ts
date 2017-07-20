import { Injectable } from '@angular/core';
import { Favorite } from "./favorite";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { Tag } from "./tag";

@Injectable()
export class AppService {
  lastId: number = 0;

  constructor(
    private api: ApiService
  ) { }

  getAllFavorites(): Observable<Favorite[]> {
    return this.api.getAllFavorites();
  }

  getAllTags(): Observable<Tag[]> {
    return this.api.getAllTags();
  }

  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.api.addFavorite(favorite);
  }

  addTag(tag: string): Observable<string> {
    return this.api.addTag(tag);
  }

  getFavoriteById(id: number): Observable<Favorite> {
    return this.api.getFavoriteById(id);
  }

  getFavoritesByTagName(tagName: string) {
    return this.api.getFavoritesByTag(tagName);
  }
}
