import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AppService } from "./app.service";
import { Favorite } from "./favorite";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  title = 'My Favorites';
  favorites: Favorite[] = [];
  tags: string[] = [];
  newFavorite: Favorite = new Favorite();

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
          this.tags = tags;
        });
  }
  
  addFavorite() {
    this.newFavorite.id = this.favorites[this.favorites.length - 1].id + 1;
    this.newFavorite.read = false;
    this.appService.addFavorite(this.newFavorite)
        .subscribe(newFavorite => {
          this.favorites = this.favorites.concat(newFavorite);
        });
    // check whether need to add tags
    this.newFavorite.tags.split(",").forEach(tag => {
      if(!this.tags.includes(tag.trim())) {
        //this.appService.addTag(tag).subscribe(newTag => {
          //this.tags = this.tags.concat(newTag);
        //});
      }
    });
    
    this.newFavorite = new Favorite();
  }
}
