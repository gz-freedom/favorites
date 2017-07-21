import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { AppService } from "../app.service";
import { Favorite } from "../favorite";
import { Tag } from "../tag";

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss'],
  providers: [AppService]
})
export class TagDetailComponent implements OnInit {
  favorites: Favorite[];
  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.appService.getFavoritesByTagId(+params['id']))
      .subscribe(res => {
        this.favorites = res;
      });
  }

}
