import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Favorite } from "../favorite";
import { AppService } from "../app.service";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html',
  styleUrls: ['./favorite-detail.component.scss'],
  providers: [AppService]
})
export class FavoriteDetailComponent implements OnInit {
  favorite: Favorite;
  constructor(
    private api: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.api.getFavoriteById(+params['id']))
      .subscribe(fav => {
        console.dir(fav);
        this.favorite = fav;
      });
  }

  deleteFavorite() {
    // todo
  }
}
