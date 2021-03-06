import { Injectable } from '@angular/core';
import { Favorite } from "./favorite";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { Tag } from "./tag";
import { Collection } from "./collection";

@Injectable()
export class AppService {
  lastId: number = 0;

  constructor(
    private api: ApiService
  ) { }

  getAllFavorites(): Observable<Favorite[]> {
    return this.api.getAllFavorites();
  }
  getFavoritesByTagId(tagId: number) {
    return this.api.getTagById(tagId).concatMap(tag => this.api.getFavoritesByIds(tag.articleIds));
  }
  getFavoritesByCollectionId(collectionId: number) {
    return this.api.getCollectionById(collectionId).concatMap(collection => this.api.getFavoritesByIds(collection.articleIds));
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

  deleteFavoriteById(id: number) {
    return this.api.deleteFavoriteById(id);
  }

  updateFavorite(fav: Favorite) {
    return this.api.updateFavorite(fav);
  }

  getTagById(id: number): Observable<Tag> {
    return this.api.getTagById(id);
  }

  getCollections(): Observable<Collection[]> {
    return this.api.getCollections();
  }
  addCollection(collection: Collection): Observable<Collection> {
    return this.api.addCollection(collection);
  }
  getCollectionById(collectionId: number): Observable<Collection> {
    return this.api.getCollectionById(collectionId);
  }
  updateCollection(collection: Collection): Observable<Collection> {
    return this.api.updateCollection(collection);
  }
}
