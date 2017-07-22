import { Component, OnInit } from '@angular/core';
import { Favorite } from "../favorite";
import { Tag } from "../tag";
import { AppService } from "../app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AppService]
})
export class HomeComponent implements OnInit {

  favorites: Favorite[] = [];
  allTags: Tag[] = [];

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.appService.getAllFavorites()
        .subscribe(favorites => {
          this.favorites = favorites;
        });
    this.appService.getAllTags()
        .subscribe(tags => {
          this.allTags = tags;
        });
  }
  
  updateFavoritesList(newFavorite) {
    this.favorites.push(newFavorite);
  }
}
