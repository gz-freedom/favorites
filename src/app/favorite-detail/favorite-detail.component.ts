import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
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
  favorite: Favorite = new Favorite();
  constructor(
    private api: AppService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.api.getFavoriteById(+params['id']))
      .subscribe(fav => {
        this.favorite = fav;
      });
  }

  deleteFavorite(id: number) {
    // todo
    this.location.back();
    this.api.deleteFavoriteById(id).subscribe();
  }
}
