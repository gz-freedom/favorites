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

  addTag(tag: Tag): Observable<Tag> {
    return this.api.addTag(tag);
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.api.updateTag(tag);
  }

  getFavoriteById(id: number): Observable<Favorite> {
    return this.api.getFavoriteById(id);
  }

  getFavoritesByTagId(tagId: number) {
    return this.api.getFavoritesByTagId(tagId);
  }

  deleteFavoriteById(id: number) {
    return this.api.deleteFavoriteById(id);
  }
}
