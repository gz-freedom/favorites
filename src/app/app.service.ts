import { Injectable } from '@angular/core';
import { Favorite } from "./favorite";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AppService {
  constructor(
    private api: ApiService
  ) { }

  getAllFavorites(): Observable<Favorite[]> {
    return this.api.getAllFavorites();
  }
}
