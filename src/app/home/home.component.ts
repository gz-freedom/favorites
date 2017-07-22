import { Component, OnInit } from '@angular/core';
import { Favorite } from "../favorite";
import { AppService } from "../app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AppService]
})
export class HomeComponent implements OnInit {
  favorites: Favorite[] = [];
  limitTo: number = 5;

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.appService.getAllFavorites()
        .subscribe(favorites => {
          if(favorites.length > this.limitTo) {
            this.favorites = favorites.slice(favorites.length - this.limitTo);
          } else {
            this.favorites = favorites;
          }          
        });
  }
  
  updateFavoritesList(newFavorite) {
    this.favorites.push(newFavorite);
  }
}
