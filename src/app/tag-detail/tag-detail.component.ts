import { Component, OnInit } from '@angular/core';
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
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.getFavoritesByTagName("ES6")
        .subscribe(response => {
          this.favorites = response;
        });
  }

}
