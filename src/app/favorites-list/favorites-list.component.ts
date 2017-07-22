import { Component, OnInit } from '@angular/core';
import { Favorite } from "../favorite";
import { AppService } from "../app.service";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  providers: [AppService]
})
export class FavoritesListComponent implements OnInit {
  favorites: Favorite[] = [];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.getAllFavorites()
      .subscribe(favorites => {
          this.favorites = favorites;
        });
  }

}
